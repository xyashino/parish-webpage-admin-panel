import React, {HTMLAttributes} from "react";
import {Status} from "@enums/status.enum";

interface Props extends HTMLAttributes<HTMLSelectElement> {
    name: string;
    url?: string;
    value?:string;
}
export const SelectStatus = ({ ...props }: Props) => {
  return (
    <select
      className="select select-md w-1/3 font-medium uppercase text-black text-center font-bold"
      {...props}
    >
      <option value="">Brak</option>
        {Object.values(Status).map((value,i) => <option key={i} value={value}>{value}</option>)}
    </select>
  );
};
