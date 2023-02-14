import { HTMLAttributes, PropsWithChildren } from "react";

interface Props extends PropsWithChildren, HTMLAttributes<HTMLButtonElement> {
  addClasses?: string;
}
export const Btn = ({ className, children, addClasses, ...props }: Props) => {
  const localStyles = "btn btn-primary m-2 p-2" + (addClasses ?? "");
  return (
    <button className={`${className ?? localStyles} text-base-100`} {...props}>
      {children}
    </button>
  );
};
