import { PropsWithChildren } from "react";

export const MainContainer = ({ children }: PropsWithChildren) => {
  return (
    <section className="mb-16 flex h-full w-5/6 flex-col items-center bg-base-100">
      {children}
    </section>
  );
};
