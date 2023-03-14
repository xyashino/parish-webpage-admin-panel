import { AlbumTypeResponse } from "@backendTypes";
import React from "react";
import { BaseTableRow } from "@components/ui/Table/BaseTableRow";
import { Modal } from "@components/ui/Modal/Modal";
import { useModal } from "@hooks/useModal";
import { RemoveGroupModalBody } from "@components/modal-body/RemoveGroupModalBody";
import {Edit} from "@icons/Edit";

interface Props {
  index: number;
  data: AlbumTypeResponse;
}

export const GalleryTypesTableRow = ({ data, index }: Props) => {
  const { hideModal, showModal, displayModal } = useModal();
  const {name,id,order} = data;
  return (
    <>
      <BaseTableRow index={index} iconClick={displayModal}  onClick={()=>console.log('click')}>
        <td className="truncate">{id}</td>
          <td>{order}</td>
          <td>{name}</td>
          <td>
              <Edit className='hover:scale-125' onClick={()=>console.log('click')}/>
          </td>
      </BaseTableRow>
      <Modal
        hideModal={hideModal}
        showModal={showModal}
        boxModalClasses="w-2/5"
      >
        <RemoveGroupModalBody id={id} name={name} hideModal={hideModal} />
      </Modal>
    </>
  );
};
