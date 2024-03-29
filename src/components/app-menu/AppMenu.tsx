import React from "react";
import { Logo } from "@icons/Logo";
import { AppMenuItem } from "@components/app-menu/AppMenuItem";
import { MENU_STRUCTURE } from "@data/menu-structure.data";
import {Link} from "react-router-dom";
import {PageRouter} from "@enums/page-router.enum";

export const AppMenu = () => {
  return (
    <nav className="flex  w-1/6 flex-col bg-base-100 shadow">
      <Link to={PageRouter.Home} className="text-md flex items-center bg-primary p-4 font-bold uppercase text-base-100 shadow hover:bg-primary-focus">
        <Logo className="mr-2 text-3xl" />
        <h2>Parafia Gruszów wielki</h2>
      </Link>
      <ul className="menu bg-base-100">
        {MENU_STRUCTURE.map((data) => (
          <AppMenuItem data={data} key={data.id} />
        ))}
      </ul>
    </nav>
  );
};
