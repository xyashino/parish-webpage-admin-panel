import React from "react";
import { AnnouncementsResponse } from "@backendTypes";

interface Props {
  title: AnnouncementsResponse["title"];
  subtitle: AnnouncementsResponse["subtitle"];
}

export const AnnouncementPreviewHeader = ({ title, subtitle }: Props) => {
  return (
    <header className="prose flex w-full flex-col items-center bg-primary p-2 text-base-100">
      <h2 className="m-2 break-words uppercase text-base-100">
        Ogłoszenia parafialne
      </h2>
      <p className="m-2 text-xl font-bold uppercase">{title}</p>
      <p className="text-md p-0">{subtitle}</p>
    </header>
  );
};
