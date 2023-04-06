import { PageRouter } from "@enums/page-router.enum";
import { NavLink } from "react-router-dom";

interface Props {
  items: { text: string; path: PageRouter }[];
}

export const Submenu = ({ items }: Props) => {
  console.log(items);
  return (
    <ul className="btn-wide z-40 border-2 border-l-0 border-base-100 bg-accent font-bold uppercase">
      {items.map(({ path, text }) => (
        <li key={path}>
          <NavLink to={path}>{text}</NavLink>
        </li>
      ))}
    </ul>
  );
};
