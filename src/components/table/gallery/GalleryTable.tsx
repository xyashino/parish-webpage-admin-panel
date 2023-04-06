import { Album } from "@backendTypes";
import { BaseTable } from "@components/ui/Table/BaseTable";
import {GalleryTableRow} from "@components/table/gallery/GalleryTableRow";

interface Props {
  data: Album[];
}

const EmptyRow = <tr>
  <td colSpan={100}>
    Brak żadnych albumów
  </td>
</tr>

export const GalleryTable = ({ data }: Props) => {
  const thColumns = ["id", "title", "typ"];
  return (
    <BaseTable thColumns={thColumns}>
      {
        data.length !== 0 ?
        data.map(({ title, id,type }, index) => (
        <GalleryTableRow
          index={index}
          title={title}
          id={id}
          key={id}
          name={type?.name}
        />
      )): EmptyRow}
    </BaseTable>
  );
};
