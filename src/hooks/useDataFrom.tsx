import { useLayoutEffect, useState } from "react";
import { AxiosBase } from "@utils/network/axios-base";
import { isAxiosError } from "axios";

export const useDataFrom = <T extends {}>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ show: false, message: "" });
  const getDataFrom = async () => {
    setLoading(true);
    setError({ show: false, message: "" });

    try {
      const response = await AxiosBase.get(url);
      setData(response.data);
    } catch (e) {
      let message = "Unknown Error";
      if (isAxiosError(error)) {
        message =
          error.response?.data.message ??
          error.response?.data.error ??
          error.message;
      }
      setError({ show: true, message });
    }
    setLoading(false);
  };

  useLayoutEffect(() => {
    getDataFrom();
  }, [url]);

  return { data, error, loading };
};
