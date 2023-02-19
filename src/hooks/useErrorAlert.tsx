import {useState} from "react";

export const useErrorAlert = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState('');
    const hideError = () => setShowAlert(false);
    const showError = (message: string) => {
        setShowAlert(true);
        setMessage(message);
    }

    return {
        errorData: {
            message,
            show:showAlert,
        }, showError, hideError
    };
}