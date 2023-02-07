import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLInputElement> {
  text: string;
  labelClassName?: string;
  textClassName?: string;
}

export const MyLabel = ({
  text,
  textClassName,
  labelClassName,
  ...props
}: Props) => {
  const labelClasses = `w-full p-4 ${labelClassName ? labelClassName : ""}`;
  const spanClasses = `uppercase font-bold ${
    textClassName ? textClassName : ""
  }`;
  return (
    <label className={labelClasses}>
      <span className={spanClasses}>{text}</span>
      <input {...props} />
    </label>
  );
};
