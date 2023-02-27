import React from "react";
import { Submenu } from "@components/AppMenu/Submenu";
import { MenuType, MenuItem } from "@data/menu-structure.data";
import {Link} from "react-router-dom";

interface Props {
  data: MenuType;
}

export const AppMenuItem = ({ data }: Props) => {
    if ("path" in data) {
        const { text, path } = data as MenuItem;
        return (
            <li className='border-b-2'>
                <Link to={path} className='font-bold uppercase'>{text}</Link>
            </li>
        );
    }

    const { name, items } = data as { name: string; items: MenuItem[] };
    return (
        <li className="border-b-2 font-bold uppercase">
            <span>{name}</span>
            <Submenu items={items} />
        </li>
    );
};
