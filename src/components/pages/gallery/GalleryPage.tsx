import React from "react";
import {Header} from "@components/ui/Header";
import {MainContainer} from "@components/ui/MainContainer";
import {Btn} from "@components/ui/Btn";
import {useLoaderData} from "react-router-dom";
import {BorderContainer} from "@components/ui/BorderContainer";
import {Album} from "@backendTypes";
import {GalleryTable} from "@components/gallery/table/GalleryTable";

export const GalleryPage = () => {
    const data = useLoaderData() as Album[];
    return (
        <MainContainer>
            <Header title='Zarządzaj galerią'/>
            <BorderContainer>
                <Btn className='btn-wide btn m-4' >Dodaj Galerie</Btn>
            </BorderContainer>
            <GalleryTable data={data}/>
        </MainContainer>
    );
};
