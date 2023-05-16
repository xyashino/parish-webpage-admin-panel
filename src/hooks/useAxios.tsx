import { useState } from "react";
import { AxiosRequestConfig, AxiosResponse, isAxiosError } from "axios";
import { AxiosBase } from "@utils/network/axios-base";
import {useCustomErrorAlert} from "@hooks/useCustomErrorAlert";
export const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const {showError,hideError,errorData} = useCustomErrorAlert();

  const requestLogic = async (
    requestMethod: () => Promise<AxiosResponse<any, any>>,
    afterSuccessMethod?: () => void,
  ) => {
    try {
      setLoading(true);
      const res = await requestMethod();
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
      if( Array.isArray(message) && message.length > 0) message = message.join('\t')
      setLoading(false);
       showError(message);
    }
  };
  const fetchDataUsingAxios = async (
    url: string,
    config?: AxiosRequestConfig,
    afterSuccessMethod?: () => void,
  ) => {
    return requestLogic(() => AxiosBase(url, config), afterSuccessMethod);
  };

  return {
    err: {
      data:errorData,
      showError,
      hideError,
    },
    loading,
    fetchDataUsingAxios,
  };
};
