import React, {HTMLAttributes, PropsWithChildren, SyntheticEvent} from "react";
import {Trash} from "@icons/Trash";

interface Props extends PropsWithChildren, HTMLAttributes<HTMLTableRowElement>{
  index: number;
  iconClick:(e?:any)=>void;
}

export const BaseTableRow = ({index,iconClick,children, ...props}: Props) => {
    const iconStyles = "text-xl m-2 hover:scale-125";

    const handleClick = (e:SyntheticEvent) => {
        e.preventDefault();
        e.stopPropagation();
        iconClick()
    }
    return (
      <tr className="hover cursor-pointer transition-colors" {...props}>
          <td>{index + 1}</td>
          {children}
          <td className="flex">
              <Trash className={iconStyles} onClick={handleClick} />
          </td>
      </tr>
  );
};
