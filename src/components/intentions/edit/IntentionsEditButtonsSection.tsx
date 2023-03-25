import React, { useContext } from "react";
import { IntentionContext } from "@context/IntentionContext";
import { Btn } from "@components/ui/Btn";
import { PageRouter } from "@enums/page-router.enum";
import { useConfirmAlert } from "@hooks/useConfirmAlert";
import { ConfirmAlert } from "@components/alerts/ConfirmAlert";
import { useAxios } from "@hooks/useAxios";
import { AxiosRequestConfig } from "axios";
import { ErrorAlert } from "@components/alerts/ErrorAlert";
import { BorderContainer } from "@components/ui/BorderContainer";
import {useRevalidator} from "react-router-dom";
export const IntentionsButtonSection = () => {
  const { intentions } = useContext(IntentionContext);
  const {revalidate} = useRevalidator();
  const { alertData, setConfig } = useConfirmAlert();
  const {
    fetchDataUsingAxios,
    err: { data, hideError },
  } = useAxios();
  const updateIntentions = async () => {
    for (const { id, dateOfDay, intentions: childIntentions } of intentions) {
      const intentions = childIntentions
        .filter(({ value, hour }) => {
          return value && hour;
        })
        .map(({ id, ...rest }) => rest);
      const config: AxiosRequestConfig = {
        method: "patch",
        data: {
          dateOfDay,
          intentions,
        },
      };
      await fetchDataUsingAxios(`${PageRouter.Intentions}/${id}`, config);
    }
  };

  const refreshData = async () => {
    setConfig("Czy na pewno chcesz odświeżyć dane?", async () => {
      revalidate()
    });
  };

  const updateData = async () => {
    setConfig("Czy na pewno chcesz zaktualizować dane?", updateIntentions);
  };

  return (
    <div  className='flex flex-col items-center'>
      <BorderContainer addClasses="flex flex-wrap justify-around w-full space-x-8 p-4">
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
    </div>
  );
};
