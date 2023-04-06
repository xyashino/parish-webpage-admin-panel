import React, { useContext } from "react";
import { Btn } from "@components/ui/Btn";
import { PageRouter } from "@enums/page-router.enum";
import { AnnouncementContext } from "@context/AnnouncementContext";
import { AnnouncementsItem, AnnouncementsResponse } from "@backendTypes";
import { useCustomConfirmAlert } from "@hooks/useCustomConfirmAlert";
import { CustomConfirmAlert } from "@components/alerts/CustomConfirmAlert";
import { useAxios } from "@hooks/useAxios";
import { CustomErrorAlert } from "@components/alerts/CustomErrorAlert";
import { BorderContainer } from "@components/ui/BorderContainer";
import { useRevalidator } from "react-router-dom";
import { AnnouncementsAction } from "@enums/announcements-action.enum";
import { CustomSuccessAlert } from "@components/alerts/CustomSuccessAlert";
import { useCustomSuccessAlert } from "@hooks/useCustomSuccessAlert";

type RestAnnouncement = Omit<AnnouncementsResponse, "announcements" | "id"> & {
  id?: string;
};
const createRequestConfig = (
  data: RestAnnouncement,
  announcements: AnnouncementsItem[]
) => {
  const { id, status, ...rest } = data;
  return {
    method: id ? "patch" : "post",
    data: {
      ...rest,
      status: (status as string) === "" ? null : status?.toUpperCase(),
      announcements: announcements.map(({ body, order }) => ({
        body,
        order,
      })),
    },
  };
};

export const AnnouncementEditButtonsSection = () => {
  const {
    announcements,
    restAnnouncement,
    setRestAnnouncement,
    dispatchAnnouncements,
  } = useContext(AnnouncementContext);
  const { configureAlert, alertData } = useCustomConfirmAlert();
  const { showSuccess, isSuccess, hideSuccess } = useCustomSuccessAlert();
  const { revalidate } = useRevalidator();
  const {
    err: { data, hideError },
    fetchDataUsingAxios,
  } = useAxios();

  const modifyAnnouncements = async () => {
    const { id } = restAnnouncement;
    const url = id
      ? `${PageRouter.Announcement}${id}`
      : PageRouter.Announcement;

    await fetchDataUsingAxios(
      url,
        createRequestConfig(restAnnouncement, announcements),
      showSuccess
    );
  };

  const refreshData = async () =>
      configureAlert("Czy na pewno chcesz odświeżyć dane?", () => revalidate());
  const updateData = async () =>
      configureAlert("Czy na pewno chcesz zapisac zamiany ?", modifyAnnouncements);
  const clearData = async () => {
    configureAlert("Czy na pewno chcesz wyczyścić dane?", () => {
      dispatchAnnouncements({ type: AnnouncementsAction.CLEAR, payload: {} });
      setRestAnnouncement(({ id }) => ({ id, subtitle: "", title: "",status:null }));
    });
  };

  return (
    <>
      <BorderContainer addClasses="flex w-full flex-wrap justify-between p-2 space-x-8">
        <Btn className="btn-wide btn" onClick={clearData}>
          Wyczść Wszystko
        </Btn>
        <Btn className="btn-wide btn" onClick={updateData}>
          Zapisz Zmiany
        </Btn>
        {restAnnouncement.id ? (
          <Btn className="btn-wide btn" onClick={refreshData}>
            Odśwież Dane
          </Btn>
        ) : null}
      </BorderContainer>
      {alertData.isVisible ? <CustomConfirmAlert confirmConfig={alertData.config} /> : null}
      {data.show ? (
        <CustomErrorAlert handleClick={hideError} errorMessage={data.message} />
      ) : null}
      {isSuccess ? (
        <CustomSuccessAlert
          message="Sukces! Zmiany zostały zapisane"
          onHide={hideSuccess}
          hideAfterMs={1500}
        />
      ) : null}
    </>
  );
};
