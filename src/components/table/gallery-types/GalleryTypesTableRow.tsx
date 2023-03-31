import { AlbumTypeResponse } from "@backendTypes";
import React, { SyntheticEvent, useState } from "react";
import { BaseTableRow } from "@components/ui/Table/BaseTableRow";
import { Modal } from "@components/ui/Modal/Modal";
import { useModal } from "@hooks/useModal";
import { Edit } from "@icons/Edit";
import {EditGroupModalBody} from "@components/modal-body/group/EditGroupModalBody";
import {RemoveGroupModalBody} from "@components/modal-body/group/RemoveGroupModalBody";

enum ModalBody {
  remove = "remove",
  edit = "edit",
}

interface Props {
  index: number;
  data: AlbumTypeResponse;
}

export const GalleryTypesTableRow = ({ data, index }: Props) => {
  const { hideModal, showModal, displayModal } = useModal();
  const { name, id, order } = data;
  const [body, setBody] = useState(ModalBody.edit);

  const handleClick = (e: SyntheticEvent, modalBody: ModalBody) => {
    e.preventDefault();
    setBody(modalBody);
    displayModal(e);
  };
  return (
    <>
      <BaseTableRow
        index={index}
        iconClick={(e) => handleClick(e, ModalBody.remove)}
      >
        <td className="truncate">{id}</td>
        <td>{order}</td>
        <td>{name}</td>
        <td>
          <Edit
            className="hover:scale-125"
            onClick={(e) => handleClick(e, ModalBody.edit)}
          />
        </td>
      </BaseTableRow>
      <Modal
        hideModal={hideModal}
        showModal={showModal}
        boxModalClasses="w-2/5"
      >
        {body === ModalBody.edit ? (
          <EditGroupModalBody data={data} hideModal={hideModal} />
        ) : null}
        {body === ModalBody.remove ? (
          <RemoveGroupModalBody id={id} name={name} hideModal={hideModal} />
        ) : null}
      </Modal>
    </>
  );
};
