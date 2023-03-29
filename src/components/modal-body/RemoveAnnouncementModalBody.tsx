import React from "react";
import { useAxios } from "@hooks/useAxios";
import { PageRouter } from "@enums/page-router.enum";
import { useRevalidator } from "react-router-dom";
import { ModalBoxRemove } from "@components/ui/Modal/ModalBoxRemove/ModalBoxRemove";
import { AxiosRequestConfig } from "axios";

const BASE_DELETE_GROUP = "delete-announcement/";
interface Props {
  hideModal: (e?: any) => void;
  title: string;
  id: string;
  status: string | null;
}

export const RemoveAnnouncementModalBody = ({
  hideModal,
  title,
  id,
  status,
}: Props) => {

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

  const removeAnnouncement = async () => {
    const config: AxiosRequestConfig = { method: "DELETE" };
    await fetchDataUsingAxios(
      `${PageRouter.Announcement}${id}`,
      config,
      runAfterSuccess
    );
  };

  const deleteInfoElement = (
    <p>
      Czy na pewno chcesz usnąć grupe o nazwie
      <p className="font-bold">{title} </p>
      {status ? (
        <p className="m-4 text-sm uppercase">
          <span className="font-bold text-error">UWAGA !!!</span> chesz usunąć
          grupe która jest niezbędna do poprawnego działania aplikacji jesli to
          zrobisz <span className="font-bold text-error"> MUSISZ </span> ustawic
          brakujący status
        </p>
      ) : null}
    </p>
  );

  return (
    <ModalBoxRemove
      hideModal={hideModal}
      removeMethod={removeAnnouncement}
      showError={showError}
      isError={data.show}
      hideError={hideError}
      deleteInfoElement={deleteInfoElement}
      errorMessage={data.message}
      mustTypeToDelete={BASE_DELETE_GROUP + title}
      loading={loading}
    />
  );
};
