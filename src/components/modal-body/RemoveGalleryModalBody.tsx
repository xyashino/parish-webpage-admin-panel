import React from "react";
import { useAxios } from "@hooks/useAxios";
import { PageRouter } from "@enums/page-router.enum";
import { useRevalidator } from "react-router-dom";
import { ModalBoxRemove } from "@components/ui/Modal/ModalBoxRemove/ModalBoxRemove";
import { AxiosRequestConfig } from "axios";

const BASE_DELETE_GROUP = "delete-gallery/";
interface Props {
  hideModal: (e?: any) => void;
  name: string;
  id: string;
}

export const RemoveGalleryModalBody = ({ hideModal, name, id }: Props) => {
  const {
    loading,
    err: { data, hideError, showError },
    fetchDataUsingAxios,
  } = useAxios();
  const { revalidate } = useRevalidator();
  const runAfterSuccess = () => {
    hideModal();
    revalidate();
  };
  const removeMethod = async () => {
    const config: AxiosRequestConfig = { method: "DELETE" };
    await fetchDataUsingAxios(
      `${PageRouter.Albums}${id}`,
      config,
      runAfterSuccess
    );
  };
  const deleteInfoElement = (
    <p>
      Czy na pewno chcesz usunąć galerie o nazwie{" "}
      <p className="font-bold">{name} </p>
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
      mustTypeToDelete={BASE_DELETE_GROUP + id}
      loading={loading}
    />
  );
};
