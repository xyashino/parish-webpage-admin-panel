import React, { HTMLAttributes, PropsWithChildren } from "react";

interface Props extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  addClasses?: string;
  onlyMyClasses?:true
}
export const BorderContainer = ({ className, children, addClasses,onlyMyClasses, ...props }: Props) => {
  let localStyles = "m-4 border-y-2 w-5/6" + (addClasses ?? "");
  if(onlyMyClasses) {
    localStyles = className ?? '';
  }
  return (
      <div className={localStyles} {...props}>
        {children}
      </div>
  );
};
