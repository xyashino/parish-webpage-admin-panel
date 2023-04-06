import React, {InputHTMLAttributes, Ref, useState} from "react";
import {CheckBoxEye} from "@components/ui/ChexboxEye";

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
    <p className="pt-1 text-sm text-error font-bold">{error?.message}</p>
  );

  let inputElement = (
    <input
      className={`${defaultInputClasses} ${optionalInputClasses} ${errorInputClass}`}
      {...props}
    />
  );

  if (typeCheckbox) {
     inputElement = (
        <input
            className={`${defaultInputClasses} ${optionalInputClasses} ${errorInputClass}`}
            type={toggleType ? typeCheckbox.at(-1) : typeCheckbox.at(0)}
            {...props}
        />
    );}


  return (
    <div className="mb-4 flex flex-col w-full items-center">
      <div className="form-control mr-4">
        <label className="mb-2 block text-left font-bold">{labelText}</label>
        <div className='flex items-center relative'>
          {inputElement}
          {typeCheckbox ? <CheckBoxEye onToggleActive={setToggleType}/> :null}
        </div>
      </div>
      {error?.show ? errorElement : null}
    </div>
  );
};
