import { Close } from "@icons/Close";
import { HTMLAttributes, SyntheticEvent } from "react";

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

  const clickMethod = (e: SyntheticEvent) => {
    e.preventDefault();
    onClick();
  };
  return (
    <div className="flex w-full justify-center">
      <div className={`alert alert-error ${alertClasses} m-2 w-5/6`} {...props}>
        <div>
          <button onClick={clickMethod} type="button">
            <Close className="text-xl hover:scale-150" />
          </button>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
};
