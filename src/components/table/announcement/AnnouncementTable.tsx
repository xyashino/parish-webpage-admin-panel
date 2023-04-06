import { BaseTable } from "@components/ui/Table/BaseTable";
import { AnnouncementsResponse } from "@backendTypes";
import { AnnouncementTableRow } from "@components/table/announcement/AnnouncementTableRow";

interface Props {
  announcements: Omit<AnnouncementsResponse, "announcements">[];
}

const EmptyRow = (
  <tr>
    <td colSpan={100}>Brak żadnych ogłoszeń</td>
  </tr>
);

export const AnnouncementTable = ({ announcements }: Props) => {
  const thColumns = ["tytuł", "podtytuł", "status"];
  return (
    <BaseTable thColumns={thColumns}>
      {announcements.length !== 0
        ? announcements.map((data, i) => (
            <AnnouncementTableRow data={data} index={i} key={data.id} />
          ))
        : EmptyRow}
    </BaseTable>
  );
};
