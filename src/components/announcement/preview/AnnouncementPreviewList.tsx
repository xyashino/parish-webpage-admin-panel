import React from "react";
import { AnnouncementsResponse } from "@backendTypes";
import { AnnouncementPreviewItem } from "@components/announcement/preview/AnnouncementPreviewItem";

interface Props {
  announcements: AnnouncementsResponse["announcements"];
}

export const AnnouncementPreviewList = ({ announcements }: Props) => {
  if (announcements.length === 0) {
    return (
      <div>
        <p className="font-bold">
          {" "}
          Przepraszamy aktualnie nie ma podanych Ogłoszeń
        </p>
      </div>
    );
  }
  return (
    <ol className="text-left">
      {announcements.map(({ body, id }) => (
        <AnnouncementPreviewItem body={body} id={id} key={id}/>
      ))}
    </ol>
  );
};
