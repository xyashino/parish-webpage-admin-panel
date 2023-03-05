import React from "react";
import { BaseTableRow } from "@components/ui/Table/BaseTableRow";
import {Modal} from "@components/ui/Modal/Modal";
import {useModal} from "@hooks/useModal";
import {RemoveGallery} from "@components/gallery/RemoveGallery";

interface Props {
  index: number;
  title: string;
  id: string;
  subtitle: string | undefined;
}

export const GalleryTableRow = ({ index, id, title, subtitle }: Props) => {
  const {hideModal,showModal,displayModal} = useModal()
  return (
    <>
      <BaseTableRow index={index} iconClick={displayModal}>
        <td className="truncate">{id}</td>
        <td>{title}</td>
        <td>{subtitle ?? "BRAK"}</td>
      </BaseTableRow>
      <Modal
          hideModal={hideModal}
          showModal={showModal}
          boxModalClasses="w-2/5"
      >
        <RemoveGallery id={id} name={title} hideModal={hideModal}/>
      </Modal>
    </>
  );
};
