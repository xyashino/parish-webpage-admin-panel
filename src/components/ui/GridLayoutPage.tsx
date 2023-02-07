import React, { ReactNode } from "react";
import { Divider } from "@components/ui/Divider";
interface Props {
  titleContent: ReactNode | ReactNode[] | string;
  leftPanelContent: ReactNode | ReactNode[] | string;
  children: ReactNode | ReactNode[];
}

export const GridLayoutPage = ({
  titleContent,
  leftPanelContent,
  children,
}: Props) => {
  return (
    <section className="row-auto grid w-full grid-cols-1 bg-base-200 p-4 shadow-neutral lg:w-4/5 ">
      <div className="p-x-2  h-full w-full ">{leftPanelContent}</div>
      <div className="row-start-1 grid w-full bg-base-100 p-4">
        <h2 className="mb-3 text-4xl font-bold">{titleContent}</h2>
        <Divider />
      </div>
      <div className="w-full pt-2">{children}</div>
    </section>
  );
};
