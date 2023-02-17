import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title: string;
}

export const ExpandableContent = ({ title, children }: Props) => {
  return (
    <div className="collapse-arrow  collapse  w-4/5 p-4 ">
      <input type="checkbox" />
      <header className="collapse-title w-full bg-primary text-center text-base-100">
        <h2 className="text-xl font-bold uppercase text-base-100">{title}</h2>
      </header>
      <div className="collapse-content transition-all duration-500">
        {children}
      </div>
    </div>
  );
};
