import { useState } from "react";

interface ErrorData {
  show: boolean;
  message: string;
}

export const useCustomErrorAlert = () => {
  const baseError: ErrorData = { show: false, message: "Unknown" };
  const [errorData, setErrorData] = useState(baseError);

  const hideError = () => setErrorData(baseError);

  const showError = (message: string) => setErrorData({ show: true, message });

  return {
    errorData,
    showError,
    hideError,
  };
};
