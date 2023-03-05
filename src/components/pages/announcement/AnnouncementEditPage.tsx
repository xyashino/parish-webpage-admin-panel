import React, {useState} from "react";
import { MainContainer } from "@components/ui/MainContainer";
import { Header } from "@components/ui/Header";
import { useLoaderData } from "react-router-dom";
import { AnnouncementsResponse } from "@backendTypes";
import { AnnouncementEditHeader } from "@components/announcement/edit/AnnouncementEditHeader";
import { AnnouncementContext } from "@context/AnnouncementContext";
import { AnnouncementEditBody } from "@components/announcement/edit/AnnouncementEditBody";
import { AnnouncementEditFooter } from "@components/announcement/edit/AnnouncementEditFooter";
import { AnnouncementEditBodyItem } from "@components/announcement/edit/AnnouncementEditButtonsSection";

export const AnnouncementEditPage = () => {
  const [data] = useLoaderData() as AnnouncementsResponse[];
  const [announcements, setAnnouncements] = useState(data);


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
