import React, { HTMLAttributes } from "react";

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "className"> {
  horizontal?: true;
  value?: string;
  className?: string;
}

export const Divider = ({ horizontal, value, className, ...props }: Props) => {
  const horizontalStyle = horizontal ? "divider-horizontal" : "";
  const ownClasses = className ? className : "";
  const tailwindStyles = `divider mb-0 ${horizontalStyle} ${ownClasses}`;

  return (
    <div className={tailwindStyles} {...props}>
      {value && ""}
    </div>
  );
};
