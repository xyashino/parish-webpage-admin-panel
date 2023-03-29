import { HTMLAttributes, PropsWithChildren } from "react";
interface Props extends PropsWithChildren, HTMLAttributes<HTMLElement> {
  article?: true;
}
export const MainContainer = ({
  children,
  className,
  article,
  ...props
}: Props) => {
  let baseStyles =
    "flex h-full w-5/6 flex-col items-center bg-base-100 ";
  if(article) baseStyles +='prose';
  if(className) baseStyles+=className;

  return (
    <section className={baseStyles} {...props}>
      {children}
    </section>
  );
};
