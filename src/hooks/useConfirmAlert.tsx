import {useState} from "react";
import {ConfirmConfig} from "@frontendTypes/confirm-config.inteface";

export const useConfirmAlert = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [alertConfig, setAlertConfig] = useState<null | ConfirmConfig>(null);

    const setConfig = (alertTextValue: string, method: ConfirmConfig['confirmClicked']) => {
        setShowAlert(true)
        setAlertConfig({
            infoText: alertTextValue,
            denyClicked: () => setShowAlert(false),
            confirmClicked: () => {
                method()
                setShowAlert(false)
            },
        });
    }

    return {
        alertData: {
            show: showAlert,
            config: alertConfig,
        }, setConfig
    };
}