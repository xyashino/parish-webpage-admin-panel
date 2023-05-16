import { PropsWithChildren, SyntheticEvent, useState } from "react";
import { Arrow } from "@icons/Arrow";

interface Props extends PropsWithChildren {
  title: string;
}

export const ExpandableContent = ({ title, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="w-4/5 p-4">
      <header
        className="flex w-full cursor-pointer items-center justify-between bg-primary p-4 text-center text-base-100"
        onClick={toggle}
      >
        <h2 className="text-xl font-bold uppercase text-base-100">{title}</h2>
        <Arrow
          className={`block h-full self-center text-2xl transition-transform ${
            isOpen ? "rotate-[270deg]" : "rotate-90"
          }`}
        />
      </header>
      <div
        className={`relative grid overflow-hidden transition-all ${
          isOpen ? "grid-rows-1fr" : "grid-rows-0fr"
        }`}
      >
        <div className="min-h-0">{children}</div>
      </div>
    </div>
  );
};
