import { PageRouter } from "@enums/page-router.enum";
import { NavLink } from "react-router-dom";

interface Props {
  items: { text: string; path: PageRouter }[];
}

export const Submenu = ({ items }: Props) => {
  return (
    <ul className=" btn-wide z-40 bg-accent font-bold uppercase">
      {items.map(({ path, text }) => {
        return (
          <li key={path}>
            <NavLink to={path}>{text}</NavLink>
          </li>
        );
      })}
    </ul>
  );
};
