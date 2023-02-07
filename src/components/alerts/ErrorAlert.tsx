import { Close } from "@icons/Close";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  onClick: () => void;
  message: string;
  onlyMyClasses?: true;
}

export const ErrorAlert = ({
  message,
  onClick,
  className,
  onlyMyClasses,
  ...props
}: Props) => {
  const alertClasses = onlyMyClasses ? className : `shadow-lg ${className}`;

  return (
    <div className={`alert alert-error ${alertClasses}`} {...props}>
      <div>
        <button onClick={onClick}>
          <Close className="text-xl hover:scale-150" />
        </button>
        <span>{message}</span>
      </div>
    </div>
  );
};
