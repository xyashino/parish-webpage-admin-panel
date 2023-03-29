import React, { HTMLAttributes } from "react";
import { Arrow } from "@icons/Arrow";
import { useNavigate } from "react-router-dom";

interface Props extends HTMLAttributes<HTMLHeadElement> {
    title: string;
    navigateRoute?:string;
}

export const HeaderWithPreviousArrow = ({ title,navigateRoute, ...props }: Props) => {
  const navigate = useNavigate();
  const goBack = () => {
      if(navigateRoute) {
          navigate(navigateRoute);
          return
      }
    navigate(-1);
  };
  return (
    <header className="flex w-full items-center bg-primary p-4 text-3xl font-bold uppercase text-base-100">
      <Arrow
        className="text-5xl transition-transform hover:scale-125"
        onClick={goBack}
      />
      <h1 {...props} className="grow self-center px-8  text-lg lg:text-3xl">
        {title}
      </h1>
    </header>
  );
};
