import React from "react";
import { UsersResponse } from "@backendTypes";
import { Trash } from "@icons/Trash";
import { Modal } from "@components/ui/Modal/Modal";
import { UserRemoveModalBody } from "@components/User/UserRemoveModalBody";
import { useModal } from "@hooks/useModal";

interface Props {
  id: UsersResponse["id"];
  email: UsersResponse["email"];
}
export const UserTableRow = ({ id, email }: Props) => {
  const iconStyles = "text-xl m-2 hover:scale-125";
  const { showModal, hideModal, displayModal } = useModal();

  return (
    <>
      <tr className="hover cursor-pointer transition-colors">
        <td>{id}</td>
        <td>{email}</td>
        <td className="flex">
          <Trash className={iconStyles} onClick={displayModal} />
        </td>
      </tr>
      <Modal
        hideModal={hideModal}
        showModal={showModal}
        boxModalClasses="w-2/5"
      >
        <UserRemoveModalBody email={email} hideModal={hideModal} id={id}/>
      </Modal>
    </>
  );
};
