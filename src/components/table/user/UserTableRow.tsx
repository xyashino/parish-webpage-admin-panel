import React from "react";
import { UsersResponse } from "@backendTypes";
import { Modal } from "@components/ui/Modal/Modal";
import { RemoveUserModalBody } from "@components/modal-body/RemoveUserModalBody";
import { useModal } from "@hooks/useModal";
import {BaseTableRow} from "@components/ui/Table/BaseTableRow";

interface Props {
  id: UsersResponse["id"];
  email: UsersResponse["email"];
    index:number;
}
export const UserTableRow = ({ id, email ,index}: Props) => {
  const { showModal, hideModal, displayModal } = useModal();
  return (
    <>
        <BaseTableRow iconClick={displayModal} index={index}>
            <td>{id}</td>
            <td>{email}</td>
        </BaseTableRow>
      <Modal
        hideModal={hideModal}
        showModal={showModal}
        boxModalClasses="w-2/5"
      >
        <RemoveUserModalBody email={email} hideModal={hideModal} id={id}/>
      </Modal>
    </>
  );
};
