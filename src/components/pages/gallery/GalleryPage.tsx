import React from "react";
import {Header} from "@components/ui/Header";
import {MainContainer} from "@components/ui/MainContainer";
import {Btn} from "@components/ui/Btn";
import {useLoaderData} from "react-router-dom";
import {BorderContainer} from "@components/ui/BorderContainer";
import {Album} from "@backendTypes";
import {GalleryTable} from "@components/gallery/table/GalleryTable";
import {Modal} from "@components/ui/Modal/Modal";
import {useModal} from "@hooks/useModal";
import {AddGallery} from "@components/gallery/add/AddGallery";

export const GalleryPage = () => {
    const data = useLoaderData() as Album[];
    const {showModal,hideModal,displayModal}= useModal();
    console.log(data)
    return (
       <>
           <MainContainer>
               <Header title='Zarządzaj galerią'/>
               <BorderContainer>
                   <Btn className='btn-wide btn m-4' onClick={displayModal} >Dodaj Galerie</Btn>
               </BorderContainer>
               <GalleryTable data={data}/>
           </MainContainer>
           <Modal hideModal={hideModal} showModal={showModal} boxModalClasses='lg:w-3/4'>
               <AddGallery hideModal={hideModal}/>
           </Modal>
       </>
    );
};
