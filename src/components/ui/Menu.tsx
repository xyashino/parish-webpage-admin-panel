import React, { ButtonHTMLAttributes } from "react";
import { MenuItem } from "@frontendTypes/menu-item.interface";

interface Props
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  items: MenuItem[];
  onClick: (e: string) => void;
}
export const Menu = ({ items, onClick }: Props) => {
  return (
    <ul className="menu menu-horizontal col-span-2  flex w-full flex-wrap justify-center bg-base-100">
      {items.map(({ title, active, type, id }) => (
        <li key={id ?? title} className="border-b-2xa">
          <button
            onClick={() => (onClick ? onClick(type ?? title) : undefined)}
            className={`bordered p-4 ${active ? "active" : ""}`}
          >
            {title}
          </button>
        </li>
      ))}
    </ul>
  );
};
