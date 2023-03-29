import { useState } from "react";

export const useSuccessAlert = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const showSuccess = () => setIsSuccess(true);
  const hideSuccess = () => setIsSuccess(false);
  return { isSuccess, showSuccess, hideSuccess };
};
