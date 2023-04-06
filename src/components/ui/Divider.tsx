import React, { HTMLAttributes } from "react";

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "className"> {
  horizontal?: boolean;
  text?: string;
  className?: string;
}

export const Divider = ({ horizontal, text, className, ...props }: Props) => {
  const horizontalStyle = horizontal ? "divider-horizontal" : "";
  const customClasses = className ?? "";
  const tailwindClasses = `divider mx-2 ${horizontalStyle} ${customClasses}`;

  return (
      <div className={tailwindClasses} {...props}>
        {text && ""}
      </div>
  );
};
