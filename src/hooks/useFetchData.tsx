import { useLayoutEffect, useState } from "react";
import { AxiosBase } from "@utils/network/axios-base";
import { isAxiosError } from "axios";

export const useFetchData = <T extends {}>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ show: false, message: "" });

  const fetchData = async () => {
    setLoading(true);
    setError({ show: false, message: "" });

    try {
      const response = await AxiosBase.get(url);
      setData(response.data);
    } catch (e) {
      let message = "Unknown Error";
      if (isAxiosError(e)) {
        message =
            e.response?.data.message ??
            e.response?.data.error ??
            e.message;
      }
      setError({ show: true, message });
    }
    setLoading(false);
  };

  useLayoutEffect(() => {
    fetchData();
  }, [url]);

  return { data, error, loading };
};
