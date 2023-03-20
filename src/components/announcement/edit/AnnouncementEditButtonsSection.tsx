import React, {useContext} from "react";
import {Btn} from "@components/ui/Btn";
import {PageRouter} from "@enums/page-router.enum";
import {AnnouncementContext} from "@context/AnnouncementContext";
import {CreateAnnouncementRequest} from "@backendTypes";
import {useConfirmAlert} from "@hooks/useConfirmAlert";
import {ConfirmAlert} from "@components/alerts/ConfirmAlert";
import {useAxios} from "@hooks/useAxios";
import {ErrorAlert} from "@components/alerts/ErrorAlert";
import {BorderContainer} from "@components/ui/BorderContainer";
import {useRevalidator} from "react-router-dom";
import {AnnouncementsAction} from "@enums/announcements-action.enum";

export const AnnouncementEditBodyItem = () => {
  const { announcements,restAnnouncement, setRestAnnouncement , dispatchAnnouncements } = useContext(AnnouncementContext);
  const { setConfig, alertData } = useConfirmAlert();
  const {revalidate} = useRevalidator();
  const {
    err: { data, hideError },
    fetchDataUsingAxios,
  } = useAxios();
  const updateAnnouncements = async () => {
    const {id,...rest}=restAnnouncement;
    const config = {
      method: "patch",
      data: {
        ...rest,
        announcements: announcements.map(({ body, order }) => ({
          body,
          order,
        })),
      } as CreateAnnouncementRequest,
    };
    await fetchDataUsingAxios(`${PageRouter.Announcement}/${id}`, config);
  };

  const refreshData = async () => {
    setConfig("Czy na pewno chcesz odświeżyć dane?", ()=>revalidate());
  };

  const updateData = async () => {
    setConfig("Czy na pewno chcesz zaktualizować dane?", updateAnnouncements);
  };

  const clearData = async () => {
    setConfig("Czy na pewno chcesz wyczyścić dane?", () => {
      dispatchAnnouncements({type:AnnouncementsAction.CLEAR,payload:{}})
      setRestAnnouncement(({id}) => ({
        id,
        subtitle: "",
        title: "",
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
