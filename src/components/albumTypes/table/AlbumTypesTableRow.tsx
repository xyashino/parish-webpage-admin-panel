import { AlbumTypeResponse } from "@backendTypes";
import React from "react";
import {BaseTableRow} from "@components/ui/Table/BaseTableRow";

interface Props {
  index: number;
  data: AlbumTypeResponse;
}

export const AlbumTypesTableRow = ({ data, index }: Props) => {
  return (
    <>
      <BaseTableRow index={index} iconClick={()=>{}} >
        <td className="truncate">{data.id}</td>
        <td>{data.name}</td>
      </BaseTableRow>
    </>
  );
};
