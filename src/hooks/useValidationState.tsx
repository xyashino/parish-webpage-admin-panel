import {useLayoutEffect, useState} from "react";

interface validationData {
    min: number;
    max?: number;
    specialChars?: string[];
}

const checkIsValid = (state: string, name: string, {min, specialChars, max}: validationData): true => {
    const {length} = state;
    if (length < min) throw new Error(`${name} musi mieć min. ${min} znaków`);
    if (max && length > max) throw new Error(`${name} musi mieć max. ${max} znaków`);
    specialChars?.forEach((char => {
        if (!state.includes(char)) throw Error(`${name} musi zawierać ${specialChars?.join(',')}`);
    }))
    return true;
}


export const useValidationState = (inputName: string, validationOptions: validationData) => {

    const [value, setValue] = useState('');
    const [isEmpty, setIsEmpty] = useState(value.length === 0);
    const [isValid, setIsValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [showError, setShowError] = useState(false);

    useLayoutEffect(() => {
        setShowError(!(isEmpty || isValid));
    }, [isEmpty, isValid])


    useLayoutEffect(
        () => {
            if (value.length === 0) {
                setIsEmpty(true);
                return
            };
            try {
                setIsEmpty(false);
                checkIsValid(value, inputName, validationOptions);
                setIsValid(true);
            } catch (e) {
                //@TODO any
                setErrorMessage((e as any).message)
                setIsValid(false);
            }
        }, [value]
    )
    return {value, setValue, isEmpty, isValid, error: {show: showError, message: errorMessage}};
}