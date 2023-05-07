import React, { useReducer, useState } from "react";
import { MainContainer } from "@components/ui/MainContainer";
import { useLoaderData } from "react-router-dom";
import {AnnouncementsResponse } from "@backendTypes";
import { AnnouncementEditHeader } from "@components/announcement/edit/AnnouncementEditHeader";
import { AnnouncementContext } from "@context/AnnouncementContext";
import { AnnouncementEditBody } from "@components/announcement/edit/AnnouncementEditBody";
import { AnnouncementEditFooter } from "@components/announcement/edit/AnnouncementEditFooter";
import {AnnouncementEditButtonsSection} from "@components/announcement/edit/AnnouncementEditButtonsSection";
import {announcementsReducer} from "@components/announcement/AnnouncementReducer";
import {HeaderWithPreviousArrow} from "@components/ui/HeaderWithPreviousArrow";
import {PageRouter} from "@enums/page-router.enum";

export const AnnouncementModifyPage = () => {
  const { announcements: announcementsResponse, ...rest } =
    useLoaderData() as Omit<AnnouncementsResponse, 'id'> & {id?:string};
  const [announcements, dispatchAnnouncements] = useReducer(
    announcementsReducer,
    announcementsResponse
  );
  const [restAnnouncement, setRestAnnouncement] = useState(rest);

  return (
    <AnnouncementContext.Provider
      value={{
        announcements,
        dispatchAnnouncements,
        restAnnouncement,
        setRestAnnouncement,
      }}
    >
      <MainContainer>
        <HeaderWithPreviousArrow title={rest.id ? "Edytuj ogłoszenia" : "Dodaj ogłoszenia"}  navigateRoute={PageRouter.Announcement}/>
        <AnnouncementEditButtonsSection />
        <div className="mt-4 flex w-full flex-col items-center  bg-base-100">
          <article className="prose prose-neutral w-full py-4 lg:prose-xl">
            <AnnouncementEditHeader />
            <AnnouncementEditBody />
            <AnnouncementEditFooter />
          </article>
        </div>
      </MainContainer>
    </AnnouncementContext.Provider>
  );
};
