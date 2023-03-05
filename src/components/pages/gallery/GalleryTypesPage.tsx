import React from "react";
import {Header} from "@components/ui/Header";
import {MainContainer} from "@components/ui/MainContainer";
import {useLoaderData} from "react-router-dom";
import {AlbumTypeResponse} from "@backendTypes";
import {InfoAlert} from "@components/alerts/InfoAlert";
import {Btn} from "@components/ui/Btn";
import {BorderContainer} from "@components/ui/BorderContainer";
import {AlbumTypesTable} from "@components/albumTypes/table/AlbumTypesTable";

export const GalleryTypesPage = () => {
    const data = useLoaderData() as AlbumTypeResponse[];
  return (
    <MainContainer>
      <Header title='Zarządzaj Typami Albumów'/>
        <InfoAlert message='Po tych typach będa grupowane albumy na stronie'/>
        <BorderContainer className='m-4 border-y-2 w-5/6'>
            <Btn  className='btn  btn-wide m-2'>Dodaj nową grupe</Btn>
        </BorderContainer>
        <AlbumTypesTable data={data}/>
    </MainContainer>
  );
};
