import React from "react";
import { useLoaderData } from "react-router-dom";
import { MainContainer } from "@components/ui/MainCointaner";
import { Header } from "@components/ui/Header";
import { Divider } from "@components/ui/Divider";
import { AnnouncementsResponse } from "@backendTypes";
import { AnnouncementPreviewList } from "@components/Announcement/preview/AnnouncementPreviewList";
import {AnnouncementPreviewHeader} from "@components/Announcement/preview/AnnouncementPreviewHeader";

export const AnnouncementPreviewPage = () => {
  const [{ announcements, title, subtitle }] =
    useLoaderData() as AnnouncementsResponse[];

  return (
    <MainContainer>
      <Header
        title="Podgląd ogłoszeń"
        className="p-4 text-4xl font-bold uppercase text-base-100 shadow"
      />
      <Divider />
      <div className="mt-10 flex flex-col items-center  bg-base-100">
        <AnnouncementPreviewHeader title={title} subtitle={subtitle} />
        <article className="prose prose-neutral w-full p-4 lg:w-4/5 lg:prose-xl">
          <AnnouncementPreviewList announcements={announcements} />
        </article>
      </div>
    </MainContainer>
  );
};
