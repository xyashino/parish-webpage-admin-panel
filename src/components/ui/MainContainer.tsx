import { HTMLAttributes, PropsWithChildren } from "react";

interface Props extends PropsWithChildren, HTMLAttributes<HTMLElement> {
  useArticle?: boolean;
}

export const MainContainer = ({
  children,
  className,
  useArticle,
  ...containerProps
}: Props) => {
  let containerClass = "flex h-full w-5/6 flex-col items-center bg-base-100 ";
  if (useArticle) containerClass += "prose ";
  if (className) containerClass += className;

  return (
    <section className={containerClass} {...containerProps}>
      {children}
    </section>
  );
};
