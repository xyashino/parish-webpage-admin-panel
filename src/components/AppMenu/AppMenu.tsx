import React from "react";
import { Logo } from "@icons/Logo";
import { AppMenuItem } from "@components/AppMenu/AppMenuItem";
import { MENU_STRUCTURE } from "@data/menu-structure.data";

export const AppMenu = () => {
  return (
    <nav className="sticky top-0 flex h-screen w-1/6 flex-col bg-base-100 shadow">
      <div className="flex items-center bg-primary p-4 text-lg font-bold uppercase text-base-100 shadow">
        <Logo className="mr-2 text-6xl" />
        <h2>Parafia Gruszów wielki</h2>
      </div>
      <ul className="menu  bg-base-100">
        {MENU_STRUCTURE.map(({ name, items }) => (
          <AppMenuItem name={name} items={items} key={name} />
        ))}
      </ul>
    </nav>
  );
};
