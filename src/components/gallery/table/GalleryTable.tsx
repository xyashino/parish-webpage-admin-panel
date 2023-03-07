import { Album } from "@backendTypes";
import { BaseTable } from "@components/ui/Table/BaseTable";
import { GalleryTableRow } from "@components/gallery/table/GalleryTableRow";

interface Props {
  data: Album[];
}

export const GalleryTable = ({ data }: Props) => {
  const thColumns = ["id", "title", "typ"];
  return (
    <BaseTable thColumns={thColumns}>
      {data.map(({ title, id,type }, index) => (
        <GalleryTableRow
          index={index}
          title={title}
          id={id}
          key={id}
          name={type?.name}
        />
      ))}
    </BaseTable>
  );
};
