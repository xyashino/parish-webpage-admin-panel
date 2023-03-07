import React, {SyntheticEvent} from "react";
import { BaseTableRow } from "@components/ui/Table/BaseTableRow";
import { Modal } from "@components/ui/Modal/Modal";
import { useModal } from "@hooks/useModal";
import { RemoveGallery } from "@components/gallery/RemoveGallery";
import {useNavigate} from "react-router-dom";
import {PageRouter} from "@enums/page-router.enum";

interface Props {
  index: number;
  title: string;
  id: string;
  name: string | undefined;
}

export const GalleryTableRow = ({ index, id, title, name }: Props) => {
  const { hideModal, showModal, displayModal } = useModal();
  const navigate = useNavigate();

  const handleClick = (e:SyntheticEvent) => {
    e.preventDefault();
    navigate(`${PageRouter.Albums}/${id}`)
  }

  return (
    <>
        <BaseTableRow index={index} iconClick={displayModal} onClick={handleClick}>
          <td className="truncate">{id}</td>
          <td>{title}</td>
          <td>{name ?? "BRAK"}</td>
        </BaseTableRow>

      <Modal
        hideModal={hideModal}
        showModal={showModal}
        boxModalClasses="w-2/5"
      >
        <RemoveGallery id={id} name={title} hideModal={hideModal} />
      </Modal>
    </>
  );
};
