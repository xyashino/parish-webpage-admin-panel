import { Divider } from "@components/ui/Divider";
import React from "react";
import { AnnouncementsItem } from "@backendTypes";
import parse from 'html-react-parser';
interface Props {
  id: AnnouncementsItem["id"];
  body: AnnouncementsItem["body"];
}

export const AnnouncementPreviewItem = ({ id, body }: Props) => {
  return (
        <li key={id}>
            {parse(body)}
            <Divider />
        </li>
  );
};
