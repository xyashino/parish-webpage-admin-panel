import React from "react";
import { useLoaderData } from "react-router-dom";
import { MainContainer } from "@components/ui/MainContainer";
import { AnnouncementsResponse } from "@backendTypes";
import { AnnouncementPreviewList } from "@components/announcement/preview/AnnouncementPreviewList";
import {AnnouncementPreviewHeader} from "@components/announcement/preview/AnnouncementPreviewHeader";

export const AnnouncementPreviewPage = () => {
  const [{ announcements, title, subtitle }] =
    useLoaderData() as AnnouncementsResponse[];

  return (
    <MainContainer>
      <div className="flex flex-col items-center  bg-base-100 w-full">
        <AnnouncementPreviewHeader title={title} subtitle={subtitle} />
        <article className="prose prose-neutral w-full p-2 lg:w-4/5 lg:prose-xl">
          <AnnouncementPreviewList announcements={announcements} />
        </article>
      </div>
    </MainContainer>
  );
};
