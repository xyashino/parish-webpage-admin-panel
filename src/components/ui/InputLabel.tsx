import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLInputElement> {
  labelName: string;
  value:string;
}

export const InputLabel = ({ labelName, className, ...props }: Props) => {
  const baseClasses = className ?? "input input-sm mx-4";

  return (
    <label>
      <span className="font-bold uppercase">{labelName} </span>
      <input type="text" className={baseClasses} {...props} />
    </label>
  );
};
