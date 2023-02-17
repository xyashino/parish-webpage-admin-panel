import React, { useContext } from "react";
import { IntentionContext } from "@context/IntentionContext";
import { Btn } from "@components/ui/Btn";
import { Divider } from "@components/ui/Divider";
import { UpdateData } from "@utils/network/update-data";
import { PageRouter } from "@enums/page-router.enum";
import { getDataFrom } from "@utils/network/get-data-from";
import {useConfirmAlert} from "@hooks/useConfirmAlert";
export const IntentionsButtonSection = () => {
  const {intentions, setIntentions} = useContext(IntentionContext);
  const {alertElement,setConfig} = useConfirmAlert();
  const updateIntentions = async () => {
    for (const { id, dateOfDay, intentions: childIntentions } of intentions) {
      const temp = childIntentions
        .map(({value, hour }) => {
          if (!value || !hour) return false;
          return { value, hour };
        })
        .filter((el) => el);
      await UpdateData(`${PageRouter.Intentions}/${id}`, {
        dateOfDay,
        intentions: temp,
      });
    }
  };



  const refreshData = async () => {
    setConfig(
     "Czy na pewno chcesz odświeżyć dane?",
      async () => {
        setIntentions(await getDataFrom(PageRouter.Intentions));
      },
    );
  };

  const updateData = async () => {
    setConfig(
    "Czy na pewno chcesz zaktualizować dane?",
      updateIntentions,
    );
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
      {alertElement}
      <Divider className="w-full" />
    </div>
  );
};
