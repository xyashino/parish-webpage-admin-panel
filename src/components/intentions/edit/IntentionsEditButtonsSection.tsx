import React, { useContext } from "react";
import { IntentionContext } from "@context/IntentionContext";
import { Btn } from "@components/ui/Btn";
import { PageRouter } from "@enums/page-router.enum";
import { useCustomConfirmAlert } from "@hooks/useCustomConfirmAlert";
import { CustomConfirmAlert } from "@components/alerts/CustomConfirmAlert";
import { useAxios } from "@hooks/useAxios";
import { AxiosRequestConfig } from "axios";
import { CustomErrorAlert } from "@components/alerts/CustomErrorAlert";
import { BorderContainer } from "@components/ui/BorderContainer";
import { useRevalidator } from "react-router-dom";

const configureUpdateDataAlert = (
  configureAlert: (message: string, callback: () => void) => void,
  updateIntentions: () => void
) => {
  configureAlert("Czy na pewno chcesz zaktualizować dane?", updateIntentions);
};

const configureRefreshDataAlert = (
  configureAlert: (message: string, callback: () => void) => void,
  revalidate: () => void
) => {
  configureAlert("Czy na pewno chcesz odświeżyć dane?", () => {
    revalidate();
  });
};

export const IntentionsButtonSection = () => {
  const { intentions } = useContext(IntentionContext);
  const { revalidate } = useRevalidator();
  const { alertData, configureAlert } = useCustomConfirmAlert();
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
      await fetchDataUsingAxios(`${PageRouter.Intentions}${id}`, config);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <BorderContainer addClasses="flex flex-wrap justify-around w-full space-x-8 p-4">
        <Btn
          className="btn-wide btn"
          onClick={() =>
            configureUpdateDataAlert(configureAlert, updateIntentions)
          }
        >
          Aktualizuj Dane
        </Btn>
        <Btn
          className="btn-wide btn"
          onClick={() => configureRefreshDataAlert(configureAlert, revalidate)}
        >
          Odśwież Dane
        </Btn>
      </BorderContainer>
      {alertData.isVisible ? (
        <CustomConfirmAlert confirmConfig={alertData.config} />
      ) : null}
      {data.show ? (
        <CustomErrorAlert handleClick={hideError} errorMessage={data.message} />
      ) : null}
    </div>
  );
};
