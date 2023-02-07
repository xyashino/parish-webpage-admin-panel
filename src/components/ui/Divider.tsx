import React, { HTMLAttributes } from "react";
interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "className"> {
  horizontal?: true;
  value?: string;
  className?: string;
}
export const Divider = ({ horizontal, value, className, ...props }: Props) => {
  const tailwindStyles = `divider ${horizontal ? "divider-horizontal" : ""} 
      ${className ? className : ""}`.trim();
  return (
    <div className={tailwindStyles} {...props}>
      {value && ""}
    </div>
  );
};
