import React from "react";
import { AnnouncementsResponse } from "@backendTypes";
import { AnnouncementPreviewItem } from "@components/Announcement/preview/AnnouncementPreviewItem";

interface Props {
  announcements: AnnouncementsResponse["announcements"];
}

export const AnnouncementPreviewList = ({ announcements }: Props) => {
  if (announcements.length === 0) {
    return <h2> Przepraszamy aktualnie nie ma podanych Ogłoszeń</h2>;
  }
  return (
    <ol className="text-left">
      {announcements.map(({ body, id }) => (
        <AnnouncementPreviewItem body={body} id={id} />
      ))}
    </ol>
  );
};
