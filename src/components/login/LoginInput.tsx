import React, {InputHTMLAttributes, Ref, useState} from "react";
import { CheckBox } from "@components/ui/CheckBox";

type InputType =
  | "email"
  | "password"
  | "text"
  | "number"
  | "date"
  | "checkbox"
  | "radio"
  | "file";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  value: string;
  ref?: Ref<HTMLInputElement>;
  error?: {
    show: boolean;
    message: string;
  };
  typeCheckbox?: [InputType, InputType];
}

export const LoginInput = ({
  labelText,
  className,
  error,
  typeCheckbox,
  ...props
}: Props) => {
  const defaultInputClasses = `input-bordered input w-full appearance-none rounded text-black shadow`;
  const errorInputClass = `${error?.show ? "input-error" : ""}`;
  const optionalInputClasses = `${className ?? ""}`;

  const [toggleType, setToggleType] = useState(false);

  const errorElement = (
    <p className="pt-1 text-sm text-error">{error?.message}</p>
  );

  const inputElement = (
    <input
      className={`${defaultInputClasses} ${optionalInputClasses} ${errorInputClass}`}
      type={toggleType && typeCheckbox ? typeCheckbox[1] : props.type}
      {...props}
    />
  );

  const labelElement = (
    <label className="mb-2 block text-left font-bold">{labelText}</label>
  );

  return (
    <div className="mb-4 flex w-full flex-col items-center">
      <div className="form-control mr-4">
        {labelElement}
        {inputElement}
      </div>
      {error?.show ? errorElement : null}
      {typeCheckbox ? (
        <CheckBox text="Pokaż" onToggleActive={setToggleType} />
      ) : null}
    </div>
  );
};
