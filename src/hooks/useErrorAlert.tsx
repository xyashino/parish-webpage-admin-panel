import {ReactNode, useLayoutEffect, useState} from "react";
import {ErrorAlert} from "@components/alerts/ErrorAlert";

export const useErrorAlert = (errorClassName?:string) => {

    const [showAlert,setShowAlert] = useState(false);
    const [message,setMessage] = useState('');
    const [errorElement, setErrorElement]= useState<null | ReactNode>(null);
    const hideAlert = ()=>setShowAlert(false);

    useLayoutEffect(() => {
        if(!showAlert) {
            setErrorElement(null);
            return;
        }
        setErrorElement(<ErrorAlert message={message} onClick={hideAlert} className={errorClassName ?? ''}/>)
    },[message]);

    const showError = (message:string) => {
        setShowAlert(true);
        setMessage(message);
    }

    return {errorElement, showError };
}