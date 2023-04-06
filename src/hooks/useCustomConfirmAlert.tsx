import { useState } from "react";
import {ConfirmConfig} from "@frontendTypes/confirm-config.inteface";

export const useCustomConfirmAlert = () => {
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertConfiguration, setAlertConfiguration] = useState<null | ConfirmConfig>(null);

  const configureAlert = (alertMessage: string, onConfirm: ConfirmConfig["handleConfirmClick"]) => {
    setAlertVisible(true);
    setAlertConfiguration({
      infoMessage: alertMessage,
      handleDenyClick: () => setAlertVisible(false),
      handleConfirmClick: () => {
        onConfirm();
        setAlertVisible(false);
      },
    });
  };

  return {
    alertData: {
      isVisible: isAlertVisible,
      config: alertConfiguration,
    },
    configureAlert,
  };
};
