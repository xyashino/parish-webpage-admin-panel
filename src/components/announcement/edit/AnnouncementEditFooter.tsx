import React, {useContext} from "react";
import {Btn} from "@components/ui/Btn";
import {AnnouncementContext} from "@context/AnnouncementContext";
import {Modal} from "@components/ui/Modal/Modal";
import {useModal} from "@hooks/useModal";
import {AnnouncementsAction} from "@enums/announcements-action.enum";
import {AddAnnouncementModalBody} from "@components/modal-body/announcement/AddAnnouncementModalBody";
import {useCustomConfirmAlert} from "@hooks/useCustomConfirmAlert";
import {Trash} from "@icons/Trash";
import {CustomConfirmAlert} from "@components/alerts/CustomConfirmAlert";

export const AnnouncementEditFooter = () => {
  const { dispatchAnnouncements,setRestAnnouncement } = useContext(AnnouncementContext);
  const { showModal, hideModal, displayModal } = useModal();
  const {configureAlert,alertData} = useCustomConfirmAlert();
  const addEmptyField = (body: string) => {
    dispatchAnnouncements({type:AnnouncementsAction.ADD, payload:{body}});
  };

    const clearData = async () => {
        configureAlert("Czy na pewno chcesz wyczyścić dane?", () => {
            dispatchAnnouncements({ type: AnnouncementsAction.CLEAR, payload: {} });
            setRestAnnouncement(({ id }) => ({ id, subtitle: "", title: "",status:null }));
        });
    };

  return (
    <>
      <div className="flex justify-around py-4">
        <Btn className="btn " onClick={displayModal}>
          Dodaj Ogłoszenie
        </Btn>
          <button  onDoubleClick={clearData}>
              <Trash className='text-5xl hover:scale-125 transition-transform'/>
          </button>
      </div>
        {alertData.isVisible ? <CustomConfirmAlert confirmConfig={alertData.config} /> : null}
      <Modal hideModal={hideModal} showModal={showModal}>
        <AddAnnouncementModalBody addField={addEmptyField} hideModal={hideModal} />
      </Modal>
    </>
  );
};
