import React from "react";
import { AnnouncementsResponse } from "@backendTypes";
import { AnnouncementPreviewItem } from "@components/announcement/preview/AnnouncementPreviewItem";

interface AnnouncementPreviewListProps {
  announcements: AnnouncementsResponse["announcements"];
}

const emptyList = (
  <div>
    <p className="font-bold">
      Przepraszamy aktualnie nie ma podanych Ogłoszeń
    </p>
  </div>
);

export const AnnouncementPreviewList = ({
  announcements,
}: AnnouncementPreviewListProps) => {

  if (announcements.length === 0) return emptyList;
  return (
    <ol className="text-left">
      {announcements.map(({ body, id }) => (
        <AnnouncementPreviewItem body={body} id={id} key={id} />
      ))}
    </ol>
  );
};
