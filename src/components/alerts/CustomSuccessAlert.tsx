import { HTMLAttributes, useLayoutEffect } from "react";
import { Success } from "@icons/Success";

interface CustomSuccessAlertProps extends HTMLAttributes<HTMLDivElement> {
  message: string;
  hideAfterMs?: number;
  onHide?: () => void;
}

export const CustomSuccessAlert = ({
  message,
  hideAfterMs,
  onHide,
  className,
  ...props
}: CustomSuccessAlertProps) => {
  useLayoutEffect(() => {
    if (!hideAfterMs || !onHide) return;
    const timeout = setTimeout(onHide, hideAfterMs);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="alert alert-success mx-8 w-5/6 shadow-lg">
      <div {...props}>
        <Success />
        <span>{message}</span>
      </div>
    </div>
  );
};
