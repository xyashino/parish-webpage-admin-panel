import React from "react";

import {PageRouter} from "@enums/page-router.enum";
import {Submenu} from "@components/AppMenu/Submenu";

interface Props {
    name: string;
    items: { text: string; path: PageRouter }[];
}

export const AppMenuItem = ({items, name}: Props) => {
    return (
        <li className="border-b-2 font-bold uppercase">
            <span>{name}</span>
            <Submenu items={items}/>
        </li>
    );
};
