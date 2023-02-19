import {Info} from "@icons/Info";
import {ConfirmConfig} from "@frontendTypes/confirm-config.inteface";
import {HTMLAttributes} from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  config: ConfirmConfig | null;
  onlyMyClasses?: true;
}

export const ConfirmAlert = ({
  config,
  onlyMyClasses,
  className,
  ...props
}: Props) => {
  if(!config) return null;
  const { confirmClicked, denyClicked, infoText } = config;
  const alertClasses = onlyMyClasses ? className : `m-8 shadow-lg ${className}`;

  return (
    <div className={`alert ${alertClasses}`} {...props}>
      <div>
        <Info className="text-3xl" />
        <span>{infoText}</span>
      </div>
      <div className="flex-none">
        <button className="btn-ghost btn-sm btn" onClick={confirmClicked}>
          Akceptuj
        </button>
        <button className="btn-primary btn-sm btn" onClick={denyClicked}>
          Odrzuć
        </button>
      </div>
    </div>
  );
};
