import React, { useContext, useState } from "react";
import { Btn } from "@components/ui/Btn";
import { Divider } from "@components/ui/Divider";
import { UpdateData } from "@utils/network/update-data";
import { PageRouter } from "@enums/page-router.enum";
import { getDataFrom } from "@utils/network/get-data-from";
import { ConfirmAlert } from "@components/alerts/ConfirmAlert";
import { ConfirmConfig } from "@frontendTypes/confirm-config.inteface";
import { AnnouncementContext } from "@context/AnnouncementContext";
import { CreateAnnouncementRequest } from "@backendTypes";

const TOOLTIP_INFO = "Ustawia aktualną date na cały tydzień";

export const AnnouncementEditBodyItem = () => {
  const { announcements, setAnnouncements } = useContext(AnnouncementContext);
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState<null | ConfirmConfig>(
    null
  );

  const updateAnnouncements = async () => {
    const {
      id,
      subtitle,
      title,
      announcements: announcementsArray,
    } = announcements;

    const response = await UpdateData(`${PageRouter.Announcement}/${id}`, {
      title,
      subtitle,
      announcements: announcementsArray.map(({ body, order }) => ({
        body,
        order,
      })),
    } as CreateAnnouncementRequest);
    console.log(response);
    setShowConfirmAlert(false);
  };

  const hideAlert = () => {
    setShowConfirmAlert(false);
  };

  const refreshData = async () => {
    setConfirmConfig({
      infoText: "Czy na pewno chcesz odświeżyć dane?",
      confirmClicked: async () => {
        const [response] = await getDataFrom(PageRouter.Announcement);
        if (response) {
          setAnnouncements(response);
        }
        setShowConfirmAlert(false);
      },
      denyClicked: hideAlert,
    });
    setShowConfirmAlert(true);
  };

  const updateData = async () => {
    setConfirmConfig({
      infoText: "Czy na pewno chcesz zaktualizować dane?",
      confirmClicked: updateAnnouncements,
      denyClicked: hideAlert,
    });
    setShowConfirmAlert(true);
  };

  const clearData = async () => {
    setConfirmConfig({
      infoText: "Czy na pewno chcesz wyczyścić dane?",
      confirmClicked: () => {
        setAnnouncements(({ id }) => ({
          id,
          subtitle: "",
          title: "",
          announcements: [],
        }));
        setShowConfirmAlert(false);
      },
      denyClicked: hideAlert,
    });
    setShowConfirmAlert(true);
  };

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

      {showConfirmAlert ? <ConfirmAlert config={confirmConfig} /> : null}
      <Divider className="w-full" />
    </div>
  );
};
