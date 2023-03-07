import React, { HTMLAttributes, PropsWithChildren } from "react";

interface Props extends HTMLAttributes<HTMLInputElement>, PropsWithChildren {
  labelName: string;
  value: string;
  name?: string;
}

export const InputLabel = ({
  labelName,
  className,
  children,
  ...props
}: Props) => {
  const baseClasses =
    className ??
    "input input-md w-full appearance-none text-black shadow";

  return (
    <div className="form-control my-2">
      <label className="label">
        <span className="label-text uppercase font-bold">{labelName}</span>
      </label>
      <input type="text" className={baseClasses} {...props} />
    </div>
  );
};
