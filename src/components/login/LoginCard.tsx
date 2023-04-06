import React, { PropsWithChildren } from "react";

interface LoginCardProps extends PropsWithChildren<unknown> {
  description: string;
  title: string;
}

export const LoginCard = ({ children, description, title }: LoginCardProps) => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">{title}</h1>
          <p className="bold py-6 text-xl italic">{description}</p>
        </div>
        <div className="card w-full max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
          <div className="card-body">{children}</div>
        </div>
      </div>
    </div>
  );
};
