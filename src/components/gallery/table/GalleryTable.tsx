import { Album } from "@backendTypes";
import { BaseTable } from "@components/ui/Table/BaseTable";
import { GalleryTableRow } from "@components/gallery/table/GalleryTableRow";

interface Props {
  data: Album[];
}

export const GalleryTable = ({ data }: Props) => {
  const thColumns = ["id", "title", "podtytuł"];
  console.log(data);
  return (
    <BaseTable thColumns={thColumns}>
      {data.map(({ title, subtitle, id }, index) => (
        <GalleryTableRow
          index={index}
          title={title}
          id={id}
          key={id}
          subtitle={subtitle}
        />
      ))}
    </BaseTable>
  );
};
