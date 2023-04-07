import { AnnouncementsResponse } from "@backendTypes";
import { BaseTableRow } from "@components/ui/Table/BaseTableRow";
import React, {SyntheticEvent} from "react";
import { Modal } from "@components/ui/Modal/Modal";
import { useModal } from "@hooks/useModal";
import {useNavigate} from "react-router-dom";
import {PageRouter} from "@enums/page-router.enum";
import {RemoveAnnouncementModalBody} from "@components/modal-body/announcement/RemoveAnnouncementModalBody";

interface Props {
  data: Omit<AnnouncementsResponse, "announcements">;
  index: number;
}

export const AnnouncementTableRow = ({ data, index }: Props) => {
  const { id, title, subtitle, status } = data;
  const { showModal, hideModal, displayModal } = useModal();
  const navigate = useNavigate();

  const handleClick = (e:SyntheticEvent) => {
      e.preventDefault();
      navigate(`${PageRouter.Announcement}${id}`)
  }

  const tdStyles =`font-bold ${status === "ACTIVE" ? 'text-success' : status==='UPCOMING' ?'text-error' : ''}`
  return (
    <>
      <BaseTableRow index={index} iconClick={displayModal} onClick={handleClick}>
        <td>{title}</td>
        <td>{subtitle ?? "NULL"}</td>
        <td className={tdStyles}>{status ?? "NULL"}</td>
      </BaseTableRow>
      <Modal
        hideModal={hideModal}
        showModal={showModal}
        boxModalClasses="w-2/5"
      >
        <RemoveAnnouncementModalBody
          title={title}
          status={status as string | null}
          hideModal={hideModal}
          id={id}
        />
      </Modal>
    </>
  );
};
