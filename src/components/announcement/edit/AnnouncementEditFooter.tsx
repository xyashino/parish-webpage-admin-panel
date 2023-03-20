import React, {useContext} from "react";
import {Btn} from "@components/ui/Btn";
import {AnnouncementContext} from "@context/AnnouncementContext";
import {Modal} from "@components/ui/Modal/Modal";
import {useModal} from "@hooks/useModal";
import {AddAnnouncementModalBody} from "@components/modal-body/AddAnnouncementModalBody";
import {AnnouncementsAction} from "@enums/announcements-action.enum";

export const AnnouncementEditFooter = () => {
  const { dispatchAnnouncements } = useContext(AnnouncementContext);
  const { showModal, hideModal, displayModal } = useModal();
  const addEmptyField = (body: string) => {
    dispatchAnnouncements({type:AnnouncementsAction.ADD, payload:{body}});
  };


  return (
    <>
      <div className="flex justify-around py-4">
        <Btn className="btn " onClick={displayModal}>
          Dodaj Ogłoszenie
        </Btn>
      </div>
      <Modal hideModal={hideModal} showModal={showModal}>
        <AddAnnouncementModalBody addField={addEmptyField} hideModal={hideModal} />
      </Modal>
    </>
  );
};
