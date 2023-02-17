import React, { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  labelText: string;
  value: string;
  ref?: React.Ref<HTMLInputElement>
  error?: {
    show: boolean;
    message: string;
  };
};

export const LoginInput = ({
  labelText,
  className,
  error,
  ...props
}: Props) => {

  const defaultInputClasses = `input-bordered input w-full appearance-none rounded text-black shadow`;
  const errorInputClass = `${error?.show ? "input-error" : ""}`;
  const optionalInputClasses = `${className ?? ""}`;

  const errorElement = (
    <p className="pt-1 text-sm text-error">{error?.message}</p>
  );



  return (
    <div className="mb-4 flex w-full flex-col items-center">
      <div className="form-control mr-4">
        <label className="mb-2 block text-left font-bold">{labelText}</label><input
            className={`${defaultInputClasses} ${optionalInputClasses} ${errorInputClass}`}
            {...props}
        />
      </div>
      {error?.show ? errorElement : null}
    </div>
  );
};
