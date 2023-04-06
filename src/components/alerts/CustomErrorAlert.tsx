import { Close } from "@icons/Close";
import { HTMLAttributes, SyntheticEvent } from "react";

interface CustomErrorAlertProps extends HTMLAttributes<HTMLDivElement> {
  handleClick: () => void;
  errorMessage: string;
  useCustomStylesOnly?: true;
}

export const CustomErrorAlert = ({
  errorMessage,
  handleClick,
  className,
  useCustomStylesOnly,
  ...props
}: CustomErrorAlertProps) => {
  const alertClassNames = useCustomStylesOnly
    ? className
    : `shadow-lg ${className}`;

  const handleButtonClick = (e: SyntheticEvent) => {
    e.preventDefault();
    handleClick();
  };

  return (
    <div className="flex w-full justify-center">
      <div
        className={`alert alert-error ${alertClassNames} m-2 w-5/6`}
        {...props}
      >
        <div>
          <button onClick={handleButtonClick} type="button">
            <Close className="text-xl hover:scale-150" />
          </button>
          <span>{errorMessage}</span>
        </div>
      </div>
    </div>
  );
};
