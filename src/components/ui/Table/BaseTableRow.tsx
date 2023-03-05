import React, {PropsWithChildren} from "react";
import {Trash} from "@icons/Trash";

interface Props extends PropsWithChildren{
  index: number;
  iconClick:(e?:any)=>void;
}

export const BaseTableRow = ({index,iconClick,children}: Props) => {
    const iconStyles = "text-xl m-2 hover:scale-125";
    return (
      <tr className="hover cursor-pointer transition-colors">
          <td>{index + 1}</td>
          {children}
          <td className="flex">
              <Trash className={iconStyles} onClick={iconClick} />
          </td>
      </tr>
  );
};
