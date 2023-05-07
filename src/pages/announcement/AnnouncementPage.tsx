import React, {SyntheticEvent} from "react";

import {useLoaderData, useNavigate} from "react-router-dom";
import { AnnouncementsResponse } from "@backendTypes";
import {MainContainer} from "@components/ui/MainContainer";
import {Header} from "@components/ui/Header";
import {BorderContainer} from "@components/ui/BorderContainer";
import {Btn} from "@components/ui/Btn";
import {AnnouncementTable} from "@components/table/announcement/AnnouncementTable";
import {PageRouter} from "@enums/page-router.enum";


export const AnnouncementPage = () => {
  const data =
    useLoaderData() as Omit<AnnouncementsResponse, 'announcements'>[];
  const navigate = useNavigate();

  const handleClick = (e:SyntheticEvent) => {
    e.preventDefault();
    navigate(`${PageRouter.Announcement}create`)
  }

  return <MainContainer>
    <Header title='Zarządzaj ogłoszeniami ' />
    <BorderContainer className='mt-8'>
      <Btn className="btn-wide btn m-4" onClick={handleClick}>
        Dodaj Ogłoszenie
      </Btn>
    </BorderContainer>

    <h2 className="m-8 p-2 text-2xl uppercase">
      Lista wszytkich ogłoszeń :
    </h2>
    <AnnouncementTable announcements={data}/>

  </MainContainer>
};
