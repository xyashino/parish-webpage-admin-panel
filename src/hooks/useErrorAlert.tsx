import { useState } from "react";
export const useErrorAlert = () => {
  const baseError = { show: false, message: "Unknown" };
  const [errorData, setErrorData] = useState(baseError);
  const hideError = () => setErrorData(baseError);
  const showError = (message: string) =>
      setErrorData({ show: true, message: message });

  return {
      errorData,
      showError,
      hideError,
  };
};
