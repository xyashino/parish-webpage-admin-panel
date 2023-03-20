import React, { useContext } from "react";
import { AnnouncementEditBodyItem } from "@components/announcement/edit/AnnouncementEditBodyItem";
import { AnnouncementContext } from "@context/AnnouncementContext";

export const AnnouncementEditBody = () => {
  const {
    announcements
  } = useContext(AnnouncementContext);

  return (
    <div className="text-left mx-10">
      {announcements.sort((a, b) => a.order-b.order).map((value) => (
        <AnnouncementEditBodyItem item={value} key={value.id} />
      ))}
    </div>
  );
};
