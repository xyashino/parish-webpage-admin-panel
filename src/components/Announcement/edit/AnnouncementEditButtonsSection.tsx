import React, { useContext } from "react";
import { Btn } from "@components/ui/Btn";
import { Divider } from "@components/ui/Divider";
import { UpdateData } from "@utils/network/update-data";
import { PageRouter } from "@enums/page-router.enum";
import { getDataFrom } from "@utils/network/get-data-from";
import { AnnouncementContext } from "@context/AnnouncementContext";
import { CreateAnnouncementRequest } from "@backendTypes";
import {useConfirmAlert} from "@hooks/useConfirmAlert";

export const AnnouncementEditBodyItem = () => {

  const { announcements, setAnnouncements } = useContext(AnnouncementContext);
  const { setConfig , alertElement} = useConfirmAlert();


  const updateAnnouncements = async () => {
    const {
      id,
      subtitle,
      title,
      announcements: announcementsArray,
    } = announcements;
    await UpdateData(`${PageRouter.Announcement}/${id}`, {
      title,
      subtitle,
      announcements: announcementsArray.map(({ body, order }) => ({
        body,
        order,
      })),
    } as CreateAnnouncementRequest);
  };


  const refreshData = async () => {
    const temp = async () => {
          const [response] = await getDataFrom(PageRouter.Announcement);
          if (response) {
            setAnnouncements(response);
          }
    }
    setConfig("Czy na pewno chcesz odświeżyć dane?",temp);
  };

  const updateData = async () => {
    setConfig(
"Czy na pewno chcesz zaktualizować dane?",
      updateAnnouncements);
  };

  const clearData = async () => {
        setConfig("Czy na pewno chcesz wyczyścić dane?",
            () => {
              setAnnouncements(({id}) => ({
                id,
                subtitle: "",
                title: "",
                announcements: [],
              }));
            })
      }
    ;

  return (
    <div className="flex  w-full flex-wrap justify-around">
      <Divider className="w-full" />

      <Btn className="btn-wide btn" onClick={clearData}>
        Wyczść Dane
      </Btn>

      <Btn className="btn-wide btn" onClick={updateData}>
        Aktualizuj Dane
      </Btn>
      <Btn className="btn-wide btn" onClick={refreshData}>
        Odśwież Dane
      </Btn>
        {alertElement}
      <Divider className="w-full" />
    </div>
  );
};
