import React from "react";
import { Header } from "@components/ui/Header";
import { MainContainer } from "@components/ui/MainContainer";
import { useLoaderData } from "react-router-dom";
import { AlbumTypeResponse } from "@backendTypes";
import { CustomInfoAlert } from "@components/alerts/CustomInfoAlert";
import { Btn } from "@components/ui/Btn";
import { BorderContainer } from "@components/ui/BorderContainer";
import { Modal } from "@components/ui/Modal/Modal";
import { useModal } from "@hooks/useModal";
import {AddNewGroupType} from "@components/galery-types/AddNewGroupType";
import {GalleryTypesTable} from "@components/table/gallery-types/GalleryTypesTable";

export const GalleryTypesPage = () => {
  const data = useLoaderData() as AlbumTypeResponse[];
  const { showModal, hideModal, displayModal } = useModal();

  return (
    <>
      <MainContainer>
        <Header title="Zarządzaj Typami Galeri" />
        <CustomInfoAlert message="Po tych typach będa grupowane albumy na stronie" />
        <BorderContainer className="m-4 w-5/6 border-y-2">
          <Btn className="btn-wide  btn m-2" onClick={displayModal}>Dodaj nową grupe</Btn>
        </BorderContainer>
        <GalleryTypesTable data={data} />
      </MainContainer>
      <Modal
        boxModalClasses="w-2/5"
        showModal={showModal}
        hideModal={hideModal}
      >
        <AddNewGroupType hideModal={hideModal}/>
      </Modal>
    </>
  );
};
