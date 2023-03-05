import React, { useContext } from "react";
import { Btn } from "@components/ui/Btn";
import { PageRouter } from "@enums/page-router.enum";
import { AnnouncementContext } from "@context/AnnouncementContext";
import { CreateAnnouncementRequest } from "@backendTypes";
import { useConfirmAlert } from "@hooks/useConfirmAlert";
import { ConfirmAlert } from "@components/alerts/ConfirmAlert";
import { useAxios } from "@hooks/useAxios";
import { ErrorAlert } from "@components/alerts/ErrorAlert";
import { BorderContainer } from "@components/ui/BorderContainer";

export const AnnouncementEditBodyItem = () => {
  const { announcements, setAnnouncements } = useContext(AnnouncementContext);
  const { setConfig, alertData } = useConfirmAlert();
  const {
    err: { data, hideError },
    fetchDataUsingAxios,
  } = useAxios();
  const updateAnnouncements = async () => {
    const {
      id,
      subtitle,
      title,
      announcements: announcementsArray,
    } = announcements;
    const config = {
      method: "patch",
      data: {
        title,
        subtitle,
        announcements: announcementsArray.map(({ body, order }) => ({
          body,
          order,
        })),
      } as CreateAnnouncementRequest,
    };
    await fetchDataUsingAxios(`${PageRouter.Announcement}/${id}`, config);
  };

  const refreshData = async () => {
    const temp = async () => {
      const [response] = await fetchDataUsingAxios(PageRouter.Announcement);
      if (response) {
        setAnnouncements(response);
      }
    };
    setConfig("Czy na pewno chcesz odświeżyć dane?", temp);
  };

  const updateData = async () => {
    setConfig("Czy na pewno chcesz zaktualizować dane?", updateAnnouncements);
  };

  const clearData = async () => {
    setConfig("Czy na pewno chcesz wyczyścić dane?", () => {
      setAnnouncements(({ id }) => ({
        id,
        subtitle: "",
        title: "",
        announcements: [],
      }));
    });
  };
  return (
    <>
      <BorderContainer addClasses="flex w-full flex-wrap justify-between p-2 space-x-8">
        <Btn className="btn-wide btn" onClick={clearData}>
          Wyczść Dane
        </Btn>

        <Btn className="btn-wide btn" onClick={updateData}>
          Aktualizuj Dane
        </Btn>
        <Btn className="btn-wide btn" onClick={refreshData}>
          Odśwież Dane
        </Btn>
      </BorderContainer>

      {alertData.show ? <ConfirmAlert config={alertData.config} /> : null}
      {data.show ? (
        <ErrorAlert onClick={hideError} message={data.message} />
      ) : null}
    </>
  );
};
