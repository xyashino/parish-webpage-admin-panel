import React, { ChangeEvent, useContext, useState } from "react";
import { Divider } from "@components/ui/Divider";
import { AnnouncementsItem } from "@backendTypes";
import { AnnouncementContext } from "@context/AnnouncementContext";
import { Close } from "@icons/Close";
import parse from "html-react-parser";
import { AnnouncementsAction } from "@enums/announcements-action.enum";
import { Edit } from "@icons/Edit";
import { useModal } from "@hooks/useModal";
import {Modal} from "@components/ui/Modal/Modal";
import {EditAnnouncementModalBody} from "@components/modal-body/announcement/EditAnnouncementModalBody";

interface Props {
  item: AnnouncementsItem;
}

export const AnnouncementEditBodyItem = ({ item }: Props) => {
  const { id, body, order: orderItem } = item;
  const { dispatchAnnouncements } = useContext(AnnouncementContext);
  const { hideModal, showModal, displayModal } = useModal();
  const [order, setOrder] = useState(orderItem);

  const updateValue = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {value} = e.target;
    if( +value < 0 || +value > 100)return;
    setOrder(+value);
  };
  const updateDataInContext = (body:string) => {
    dispatchAnnouncements({
      type: AnnouncementsAction.UPDATE,
      payload: { order , body ,id },
    });
  };
  const removeItemFromContext = () => {
    dispatchAnnouncements({
      type: AnnouncementsAction.DELETE,
      payload: { id },
    });
  };
  return (
    <>
      <div>
        <li className="flex w-full items-center">
          <input
            type="number"
            value={order}
            className="ghost input mx-2.5 w-1/12 h-full text-center text-xl"
            name="order"
            onChange={(e) => updateValue(e)}
            onBlur={()=>updateDataInContext(body)}
          />
          <div className="w-4/5 border-l-2 px-2 my-2">{parse(body)}</div>
          <Edit  onClick={displayModal} className="mx-5 text-3xl hover:scale-125 text-black"/>
          <Close
            className="mx-5 text-3xl hover:scale-125 text-black"
            onClick={removeItemFromContext}
          />
        </li>
        <Divider />
      </div>
      <Modal hideModal={hideModal} showModal={showModal}>
        <EditAnnouncementModalBody hideModal={hideModal} body={body} addField={updateDataInContext}/>
      </Modal>
    </>
  );
};
