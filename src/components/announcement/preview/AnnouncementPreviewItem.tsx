import { Divider } from "@components/ui/Divider";
import React from "react";
import { AnnouncementsItem } from "@backendTypes";

interface Props {
  id: AnnouncementsItem["id"];
  body: AnnouncementsItem["body"];
}

export const AnnouncementPreviewItem = ({ id, body }: Props) => {
  return (
    <div key={id}>
      <li>{body}</li>
      <Divider />
    </div>
  );
};
