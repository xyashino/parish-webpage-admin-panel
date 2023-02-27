import React, { HTMLAttributes, PropsWithChildren } from "react";

interface Props extends PropsWithChildren, HTMLAttributes<HTMLHeadElement> {
  title: string;
}

export const Header = ({ title, children, ...props }: Props) => {
  return (
    <header className="w-full">
      <h1
        {...props}
        className="mb-1 bg-primary p-4 text-4xl font-bold uppercase text-base-100 shadow"
      >
        {title}
      </h1>
      {children ?? null}
    </header>
  );
};
