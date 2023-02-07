import React, { useContext } from "react";
import { AnnouncementEditBodyItem } from "@components/Announcement/edit/AnnouncementEditBodyItem";
import { AnnouncementContext } from "@context/AnnouncementContext";

export const AnnouncementEditBody = () => {
  const {
    announcements: { announcements },
  } = useContext(AnnouncementContext);

  return (
    <div className="text-left">
      {announcements.map((value) => (
        <AnnouncementEditBodyItem item={value} key={value.id} />
      ))}
    </div>
  );
};
