import React, { useContext } from "react";
import { Btn } from "@components/ui/Btn";
import { PageRouter } from "@enums/page-router.enum";
import { AnnouncementContext } from "@context/AnnouncementContext";
import { AnnouncementsItem, AnnouncementsResponse } from "@backendTypes";
import { useConfirmAlert } from "@hooks/useConfirmAlert";
import { ConfirmAlert } from "@components/alerts/ConfirmAlert";
import { useAxios } from "@hooks/useAxios";
import { ErrorAlert } from "@components/alerts/ErrorAlert";
import { BorderContainer } from "@components/ui/BorderContainer";
import { useRevalidator } from "react-router-dom";
import { AnnouncementsAction } from "@enums/announcements-action.enum";
import { SuccessAlert } from "@components/alerts/SuccessAlert";
import { useSuccessAlert } from "@hooks/useSuccessAlert";

type RestAnnouncement = Omit<AnnouncementsResponse, "announcements" | "id"> & {
  id?: string;
};
const createConfig = (
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
  const { setConfig, alertData } = useConfirmAlert();
  const { showSuccess, isSuccess, hideSuccess } = useSuccessAlert();
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
      createConfig(restAnnouncement, announcements),
      showSuccess
    );
  };

  const refreshData = async () =>
    setConfig("Czy na pewno chcesz odświeżyć dane?", () => revalidate());
  const updateData = async () =>
    setConfig("Czy na pewno chcesz zapisac zamiany ?", modifyAnnouncements);
  const clearData = async () => {
    setConfig("Czy na pewno chcesz wyczyścić dane?", () => {
      dispatchAnnouncements({ type: AnnouncementsAction.CLEAR, payload: {} });
      setRestAnnouncement(({ id }) => ({ id, subtitle: "", title: "" }));
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
      {alertData.show ? <ConfirmAlert config={alertData.config} /> : null}
      {data.show ? (
        <ErrorAlert onClick={hideError} message={data.message} />
      ) : null}
      {isSuccess ? (
        <SuccessAlert
          text="Sukces! Zmiany zostały zapisane"
          hideMethod={hideSuccess}
          hideAfterMs={1500}
        />
      ) : null}
    </>
  );
};
