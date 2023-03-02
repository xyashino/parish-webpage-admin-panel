import { useState } from "react";
import { AxiosRequestConfig, isAxiosError } from "axios";
import { AxiosBase } from "@utils/network/axios-base";
export const useAxios = () => {
  const baseError = { show: false, message: "Unknown" };
  const [data, setData] = useState(baseError);
  const [loading, setLoading] = useState(false);

  const hideError = () => setData(baseError);
  const showError = (message: string) =>
    setData({ show: true, message: message });
  const fetchDataUsingAxios = async (
    url: string,
    config?: AxiosRequestConfig,
    afterSuccessMethod?: () => void
  ) => {
    try {
      setLoading(true);
      const res = await AxiosBase(url, config);
      setLoading(false);
      hideError();
      if (afterSuccessMethod) afterSuccessMethod();
      return res.data;
    } catch (error) {
      let message = "Unknown Error";
      if (isAxiosError(error)) {
        message =
          error.response?.data.message ??
          error.response?.data.error ??
          error.message;
      }
      setLoading(false);
      setData({ show: true, message: message });
    }
  };
  return {
    err: {
      data,
      showError,
      hideError,
    },
    loading,
    fetchDataUsingAxios,
  };
};
