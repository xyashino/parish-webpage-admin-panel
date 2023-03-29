import { HTMLAttributes, useLayoutEffect } from "react";
import {Success} from "@icons/Success";

interface Props extends HTMLAttributes<HTMLDivElement> {
  text: string;
  hideAfterMs?: number;
  hideMethod?: () => void;
}

export const SuccessAlert = ({
  text,
  hideAfterMs,
  hideMethod,
  className,
  ...props
}: Props) => {
  useLayoutEffect(() => {
    if (!hideAfterMs || !hideMethod) return;
    const interval = setTimeout(hideMethod, hideAfterMs);
    return ()=> clearInterval(interval);
  }, []);

  return (
    <div className="alert alert-success shadow-lg mx-8 w-5/6">
      <div {...props}>
        <Success/>
        <span>{text}</span>
      </div>
    </div>
  );
};
