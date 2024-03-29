import { AlbumTypeResponse } from "@backendTypes";
import { BaseTable } from "@components/ui/Table/BaseTable";
import {GalleryTypesTableRow} from "@components/table/gallery-types/GalleryTypesTableRow";

interface Props {
  data: AlbumTypeResponse[];
}
const EmptyRow = <tr>
  <td colSpan={100}>
    Nie ma żadnych typów
  </td>
</tr>

export const GalleryTypesTable = ({ data }: Props) => {
  const thColumns = ["id",'order', "nazwa",''];
  return (
    <BaseTable thColumns={thColumns}>
      {data.length !== 0
        ? data.map((el, i) => (
            <GalleryTypesTableRow data={el} index={i} key={el.id} />
          )) : EmptyRow}
    </BaseTable>
  );
};
