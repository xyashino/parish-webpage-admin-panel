import React from "react";
import { useRevalidator } from "react-router-dom";
import { PageRouter } from "@enums/page-router.enum";
import { UsersResponse } from "@backendTypes";
import { useAxios } from "@hooks/useAxios";
import { ModalBoxRemove } from "@components/ui/Modal/ModalBoxRemove/ModalBoxRemove";
const BASE_DELETE_USER = "delete-user/";

interface Props {
  id: UsersResponse["id"];
  email: UsersResponse["email"];
  hideModal: (e?: any) => void;
}

export const UserRemoveModalBody = ({ email, hideModal, id }: Props) => {
  const {
    loading,
    err: { hideError, showError, data },
    fetchDataUsingAxios,
  } = useAxios();
  const { revalidate } = useRevalidator();

  const runAfterSuccess = () => {
    hideModal();
    revalidate();
  };
  const removeMethod = async () => {
    const config = {
      method: "delete",
    };
    await fetchDataUsingAxios(
      `${PageRouter.Users}${id}`,
      config,
      runAfterSuccess
    );
  };

  const deleteInfoElement = (
    <p>
      Czy na pewno chcesz usuąć ? <p className="font-bold">{email}</p>
    </p>
  );

  return (
    <ModalBoxRemove
      hideModal={hideModal}
      removeMethod={removeMethod}
      showError={showError}
      isError={data.show}
      hideError={hideError}
      deleteInfoElement={deleteInfoElement}
      errorMessage={data.message}
      mustTypeToDelete={BASE_DELETE_USER + email}
      loading={loading}
    />
  );
};
