import React, { ButtonHTMLAttributes, SyntheticEvent } from "react";
import { MenuItem } from "@frontendTypes/menu-item.interface";

interface Props
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  items: MenuItem[];
  onClick: (e: string) => void;
}
export const Menu = ({ items, onClick }: Props) => {
  const handleClick = (e: SyntheticEvent, data: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) {
      onClick(data);
    }
  };
  return (
    <ul className="menu menu-horizontal col-span-2  flex w-full flex-wrap justify-center bg-base-100">
      {items.map(({ title, active, id,type }) => (
        <li key={id ?? title} className="border-b-2xa">
          <button
            onClick={(e) => handleClick(e, type ?? id ?? title )}
            className={`bordered p-4 ${active ? "active" : ""}`}
          >
            {title}
          </button>
        </li>
      ))}
    </ul>
  );
};
