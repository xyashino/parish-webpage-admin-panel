import React, { HTMLAttributes, PropsWithChildren } from "react";

type InputType =
  | "email"
  | "password"
  | "text"
  | "number"
  | "date"
  | "checkbox"
  | "radio"
  | "file";

interface Props extends HTMLAttributes<HTMLInputElement>, PropsWithChildren {
  labelName: string;
  value: string;
  name?: string;
  type?: InputType;
}

export const InputLabel = ({
  labelName,
  className,
  children,
  type = "text",
  ...props
}: Props) => {
  const baseClasses =
    className ?? "input input-md w-full appearance-none text-black shadow";

  return (
    <div className="form-control my-2">
      <label className="label">
        <span className="label-text font-bold uppercase">{labelName}</span>
      </label>
      <input type={type} className={baseClasses} {...props} />
    </div>
  );
};
