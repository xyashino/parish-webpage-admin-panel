import React from "react";
import { Logo } from "@icons/Logo";
import { AppMenuItem } from "@components/AppMenu/AppMenuItem";
import { MENU_STRUCTURE } from "@data/menu-structure.data";

export const AppMenu = () => {
  return (
    <nav className="flex  w-1/6 flex-col bg-base-100 shadow">
      <div className="text-md flex items-center bg-primary p-4 font-bold uppercase text-base-100 shadow">
        <Logo className="mr-2 text-3xl" />
        <h2>Parafia Gruszów wielki</h2>
      </div>
      <ul className="menu bg-base-100">
        {MENU_STRUCTURE.map(({ name, items }) => (
          <AppMenuItem name={name} items={items} key={name} />
        ))}
      </ul>
    </nav>
  );
};
