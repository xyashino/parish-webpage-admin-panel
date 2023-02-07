import React, { useEffect, useState } from "react";
import { MainContainer } from "@components/ui/MainCointaner";
import { Header } from "@components/ui/Header";
import { useLoaderData } from "react-router-dom";
import { AnnouncementsResponse } from "@backendTypes";
import { AnnouncementEditHeader } from "@components/Announcement/edit/AnnouncementEditHeader";
import { AnnouncementContext } from "@context/AnnouncementContext";
import { AnnouncementEditBody } from "@components/Announcement/edit/AnnouncementEditBody";
import { AnnouncementEditFooter } from "@components/Announcement/edit/AnnouncementEditFooter";
import { AnnouncementEditBodyItem } from "@components/Announcement/edit/AnnouncementEditButtonsSection";

export const AnnouncementEditPage = () => {
  const [data] = useLoaderData() as AnnouncementsResponse[];
  const [announcements, setAnnouncements] = useState(data);
  const [announcementsList, setAnnouncementsList] = useState(
    data.announcements
  );
  useEffect(() => {
    if (announcements.announcements) {
      setAnnouncementsList(announcements.announcements);
    }
  }, [announcements]);

  return (
    <AnnouncementContext.Provider value={{ announcements, setAnnouncements }}>
      <MainContainer>
        <Header title="Edytuj ogłoszenia " />
        <AnnouncementEditBodyItem />

        <div className="mt-4 flex w-full flex-col items-center  bg-base-100">
          <article className="prose prose-neutral w-full py-4 lg:prose-xl">
            <AnnouncementEditHeader
              title={data.title}
              subtitle={data.subtitle}
            />
            <AnnouncementEditBody />
            <AnnouncementEditFooter />
          </article>
        </div>
      </MainContainer>
    </AnnouncementContext.Provider>
  );
};
