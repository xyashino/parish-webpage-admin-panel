import { Info } from "@icons/Info";
import { HTMLAttributes } from "react";
import { ConfirmConfig } from "@frontendTypes/confirm-config.inteface";

interface ConfirmAlertProps extends HTMLAttributes<HTMLDivElement> {
  confirmConfig: ConfirmConfig | null;
  useCustomStyles?: boolean;
}

export const CustomConfirmAlert = ({
  confirmConfig,
  useCustomStyles,
  className,
  ...props
}: ConfirmAlertProps) => {
  if (!confirmConfig) return null;
  const { handleConfirmClick, handleDenyClick, infoMessage } = confirmConfig;

  const alertClassNames = useCustomStyles
    ? className
    : `m-8 shadow-lg ${className}`;

  return (
    <div className="flex w-full justify-center">
      <div className={`alert ${alertClassNames} m-2 w-5/6`} {...props}>
        <div>
          <Info className="text-3xl" />
          <span>{infoMessage}</span>
        </div>
        <div className="flex-none">
          <button className="btn-ghost btn-sm btn" onClick={handleConfirmClick}>
            Akceptuj
          </button>
          <button className="btn-primary btn-sm btn" onClick={handleDenyClick}>
            Odrzuć
          </button>
        </div>
      </div>
    </div>
  );
};
