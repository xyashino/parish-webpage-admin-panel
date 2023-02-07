import React, { useContext, useState } from "react";
import { IntentionContext } from "@context/IntentionContext";
import { Btn } from "@components/ui/Btn";
import { Divider } from "@components/ui/Divider";
import { UpdateData } from "@utils/network/update-data";
import { PageRouter } from "@enums/page-router.enum";
import { getDataFrom } from "@utils/network/get-data-from";
import { ConfirmAlert } from "@components/alerts/ConfirmAlert";
import { ConfirmConfig } from "@frontendTypes/confirm-config.inteface";

const TOOLTIP_INFO = "Ustawia aktualną date na cały tydzień";

export const IntentionsButtonSection = () => {
  const { intentions, setIntentions } = useContext(IntentionContext);
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState<null | ConfirmConfig>(
    null
  );

  const updateIntentions = async () => {
    for (const { id, dateOfDay, intentions: childIntentions } of intentions) {
      const temp = childIntentions
        .map(({ id, value, hour }) => {
          if (!value || !hour) return false;
          return { value, hour };
        })
        .filter((el) => el);
      await UpdateData(`${PageRouter.Intentions}/${id}`, {
        dateOfDay,
        intentions: temp,
      });
    }
    setShowConfirmAlert(false);
  };

  const hideAlert = () => {
    setShowConfirmAlert(false);
  };

  const refreshData = async () => {
    setConfirmConfig({
      infoText: "Czy na pewno chcesz odświeżyć dane?",
      confirmClicked: async () => {
        setIntentions(await getDataFrom(PageRouter.Intentions));
        setShowConfirmAlert(false);
      },
      denyClicked: hideAlert,
    });
    setShowConfirmAlert(true);
  };

  const updateData = async () => {
    setConfirmConfig({
      infoText: "Czy na pewno chcesz zaktualizować dane?",
      confirmClicked: updateIntentions,
      denyClicked: hideAlert,
    });
    setShowConfirmAlert(true);
  };

  return (
    <div className="flex  flex-wrap justify-around">
      <Divider className="w-full" />
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
