import { Info } from "@icons/Info";
import { HTMLAttributes } from "react";

interface CustomInfoAlertProps extends HTMLAttributes<HTMLDivElement> {
  message: string;
  useCustomStylesOnly?: true;
}

export const CustomInfoAlert = ({
  useCustomStylesOnly,
  className,
  message,
  ...props
}: CustomInfoAlertProps) => {
  const alertClassNames = useCustomStylesOnly
    ? className
    : `alert alert-info shadow-lg w-5/6 m-2 ${className}`;

  return (
    <div className="flex w-full justify-center">
      <div className={alertClassNames} {...props}>
        <div>
          <Info />
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
};
