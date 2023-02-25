import React from "react";
import { AnnouncementsResponse } from "@backendTypes";

interface Props {
  title: AnnouncementsResponse["title"];
  subtitle: AnnouncementsResponse["subtitle"];
}

export const AnnouncementPreviewHeader = ({ title, subtitle }: Props) => {
  return (
    <header className="prose flex flex w-full items-center justify-center bg-primary p-4">
      <h2 className="p-4 text-base-100">
        Ogłoszenia parafialne
        <p>{title}</p>
        <p>{subtitle}</p>
      </h2>
    </header>
  );
};
