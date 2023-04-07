import React from "react";
import { AnnouncementsResponse } from "@backendTypes";
import {HeaderWithPreviousArrow} from "@components/ui/HeaderWithPreviousArrow";

interface Props {
  title: AnnouncementsResponse["title"];
  subtitle: AnnouncementsResponse["subtitle"];
}

export const AnnouncementPreviewHeader = ({ title, subtitle }: Props) => {
  return (
    <header className="prose flex w-full flex-col items-center bg-primary p-2 text-base-100">
        <HeaderWithPreviousArrow title='Ogłoszenia parafialne'/>
        <p className="text-xl font-bold uppercase m-0 p-0">{title}</p>
      <p className="text-md font-light">{subtitle}</p>
    </header>
  );
};
