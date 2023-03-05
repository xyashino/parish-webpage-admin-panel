import { Info } from "@icons/Info";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  message: string;
  onlyMyClasses?: true;
}

export const InfoAlert = ({
  onlyMyClasses,
  className,
  message,
  ...props
}: Props) => {
  const alertClasses = onlyMyClasses
    ? className
    : `alert alert-info shadow-lg w-5/6 m-2 ${className}`;

  return (
    <div className={alertClasses} {...props}>
      <div>
        <Info />
        <span>{message}</span>
      </div>
    </div>
  );
};
