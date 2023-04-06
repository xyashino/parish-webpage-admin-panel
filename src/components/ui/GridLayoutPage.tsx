import React, { PropsWithChildren, ReactNode } from "react";
import { Divider } from "@components/ui/Divider";
interface Props extends PropsWithChildren {
  titleContent: ReactNode | ReactNode[] | string;
  panelContent: ReactNode | ReactNode[] | string;
}

export const GridLayoutPage = ({
  titleContent,
  panelContent,
  children,
}: Props) => {
  return (
    <section className="row-auto grid w-full grid-cols-1 bg-base-200 p-4 shadow-neutral lg:w-4/5 ">
      <div className="p-x-2  h-full w-full ">{panelContent}</div>
      <div className="row-start-1 grid w-full bg-base-100 p-4">
        <h2 className="mb-3 text-4xl font-bold">{titleContent}</h2>
        <Divider />
      </div>
      <div className="w-full pt-2">{children}</div>
    </section>
  );
};
