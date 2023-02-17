import {ReactElement, useLayoutEffect, useState} from "react";
import {ConfirmConfig} from "@frontendTypes/confirm-config.inteface";
import {ConfirmAlert} from "@components/alerts/ConfirmAlert";
export const useConfirmAlert = (alertClassName?:string) => {
    const [showAlert,setShowAlert] = useState(false);
    const [alertConfig, setAlertConfig] = useState<null | ConfirmConfig>(null);
    const [alertElement, setAlertElement] = useState<null | ReactElement>( null);

    useLayoutEffect(() => {
        if(showAlert) {
            setAlertElement(<ConfirmAlert config={alertConfig} className={`${alertClassName ?? ''}`}/>)
            return;
        }
        setAlertElement(null);
    },[showAlert , alertConfig]);
    const setConfig = (alertTextValue:string , method: ConfirmConfig['confirmClicked']) => {
        setShowAlert(true)
        setAlertConfig({
            infoText:alertTextValue,
            denyClicked: () => setShowAlert(false),
            confirmClicked: () => {
                method()
                setShowAlert(false)
            },
        });
    }

    return {alertElement, setConfig };
}