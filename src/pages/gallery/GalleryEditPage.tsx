import React, { SyntheticEvent, useState } from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { Album } from "@backendTypes";
import { MainContainer } from "@components/ui/MainContainer";
import { GalleryEditForm } from "@components/gallery/GalleryEditForm";
import { Btn } from "@components/ui/Btn";
import { useModal } from "@hooks/useModal";
import { Modal } from "@components/ui/Modal/Modal";
import { UploadImageModalBody } from "@components/modal-body/image/UploadImageModalBody";
import { RemoveImageModalBody } from "@components/modal-body/image/RemoveImageModalBody";
import { ChangeImageModalBody } from "@components/modal-body/image/ChangeImageModalBody";
import {HeaderWithPreviousArrow} from "@components/ui/HeaderWithPreviousArrow";
import {PageRouter} from "@enums/page-router.enum";

enum ModalBody {
  uploadImg,
  deleteImg,
  changeImg,
}

export const GalleryEditPage = () => {
  const data = useLoaderData() as Album;
  const { showModal, displayModal, hideModal } = useModal();
  const [body, setBody] = useState<ModalBody>(ModalBody.uploadImg);
  const { revalidate } = useRevalidator();
  const toggleDisableBtn = data.images.length === 0 ? "btn-disabled" : "";

  const handleClick = (e: SyntheticEvent, modalBody: ModalBody) => {
    e.preventDefault();
    setBody(modalBody);
    displayModal(e);
  };

  const hideModalWithRevalidation = (e: SyntheticEvent) => {
    hideModal(e);
    revalidate();
  };

  const renderModalBody = () => {
    switch (body) {
      case ModalBody.uploadImg:
        return <UploadImageModalBody id={data.id} />;
      case ModalBody.deleteImg:
        return <RemoveImageModalBody data={data} />;
      case ModalBody.changeImg:
        return <ChangeImageModalBody data={data} />;
      default:
        return null;
    }
  };

  return (
      <>
        <MainContainer>
          <HeaderWithPreviousArrow title="Zarządzaj albumem" navigateRoute={PageRouter.GalleryAlbums}/>
          <GalleryEditForm data={data} />
          <div className="m-4 flex w-full flex-wrap justify-around">
            <Btn
                className="btn-wide btn"
                onClick={(e) => handleClick(e, ModalBody.changeImg)}
            >
              Zarządzaj okładką
            </Btn>
            <Btn
                className="btn-wide btn"
                onClick={(e) => handleClick(e, ModalBody.uploadImg)}
            >
              Dodaj zdjęcia
            </Btn>
            <Btn
                className={`btn-wide btn ${toggleDisableBtn}`}
                onClick={(e) => handleClick(e, ModalBody.deleteImg)}
            >
              Usuń zdjęcia
            </Btn>
          </div>
        </MainContainer>
        <Modal hideModal={hideModalWithRevalidation} showModal={showModal} boxModalClasses='w-4/5'>
          {renderModalBody()}
        </Modal>
      </>
  );
};
