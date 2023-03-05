import { AlbumTypeResponse } from "@backendTypes";
import { AlbumTypesTableRow } from "@components/albumTypes/table/AlbumTypesTableRow";
import { BaseTable } from "@components/ui/Table/BaseTable";

interface Props {
  data: AlbumTypeResponse[];
}

export const AlbumTypesTable = ({ data }: Props) => {
    const thColumns = ['id','nazwa']
  return (
    <BaseTable thColumns={thColumns}>
      {data.map((el, i) => (
        <AlbumTypesTableRow data={el} index={i} key={el.id} />
      ))}
    </BaseTable>
  );
};
