import React, { InputHTMLAttributes } from "react";
import { Info } from "@icons/Info";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  value: string;
  tooltip: string;
}

export const LoginInput = ({
  labelText,
  className,
  tooltip,
  ...props
}: Props) => {
  return (
    <div className="mb-4 flex w-full items-center">
      <div className="form-control mr-4">
        <label className="mb-2 block text-left font-bold">{labelText}</label>
        <input
          className={`input-bordered input w-full appearance-none rounded text-black shadow ${className}`}
          {...props}
        />
      </div>
      <div className="tooltip-hover tooltip tooltip-right" data-tip={tooltip}>
        <Info className="text-3xl" />
      </div>
    </div>
  );
};
