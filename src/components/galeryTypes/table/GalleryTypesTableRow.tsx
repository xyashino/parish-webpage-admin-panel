import { AlbumTypeResponse } from "@backendTypes";
import React from "react";
import { BaseTableRow } from "@components/ui/Table/BaseTableRow";
import { Modal } from "@components/ui/Modal/Modal";
import { useModal } from "@hooks/useModal";
import { RemoveGroupType } from "@components/galeryTypes/RemoveGroupType";

interface Props {
  index: number;
  data: AlbumTypeResponse;
}

export const GalleryTypesTableRow = ({ data, index }: Props) => {
  const { hideModal, showModal, displayModal } = useModal();
  const {name,id} = data;
  return (
    <>
      <BaseTableRow index={index} iconClick={displayModal}>
        <td className="truncate">{id}</td>
        <td>{name}</td>
      </BaseTableRow>
      <Modal
        hideModal={hideModal}
        showModal={showModal}
        boxModalClasses="w-2/5"
      >
        <RemoveGroupType id={id} name={name} hideModal={hideModal} />
      </Modal>
    </>
  );
};
