import {PropsWithChildren} from "react";

interface Props extends PropsWithChildren{
  thColumns: string[];
}

export const BaseTable = ({thColumns,children}: Props) => {
  return (
    <table className="table w-5/6 shadow-2xl" >
      <thead>
        <tr>
          <th>Lp.</th>
            {thColumns.map((el,index)=> <th key={index}>{el}</th>)}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </table>
  );
};
