import { AlbumTypeResponse } from "@backendTypes";
import { AlbumTypesTableRow } from "@components/albumTypes/table/AlbumTypesTableRow";
import { BaseTable } from "@components/ui/Table/BaseTable";

interface Props {
  data: AlbumTypeResponse[];
}
const EmptyRow = <tr>
  <td colSpan={100}>
    Nie ma żadnych typów
  </td>
</tr>

export const AlbumTypesTable = ({ data }: Props) => {
  const thColumns = ["id", "nazwa"];
  return (
    <BaseTable thColumns={thColumns}>
      {data.length === 0
        ? EmptyRow
        : data.map((el, i) => (
            <AlbumTypesTableRow data={el} index={i} key={el.id} />
          ))}
    </BaseTable>
  );
};
