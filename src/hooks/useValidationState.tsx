import {useLayoutEffect, useState} from "react";

interface validationData {
  min: number;
  max?: number;
  specialChars?: string[];
  sameAs?:string;
}

function checkIsValid(state:string, name:string, { min, specialChars, max, sameAs }:validationData) {
  const { length } = state;
  switch (true) {
    case length < min:
      throw new Error(`${name} musi mieć min. ${min} znaków`);
    case max && length > max:
      throw new Error(`${name} musi mieć max. ${max} znaków`);
    case specialChars?.some(char => !state.includes(char)):
      throw new Error(`${name} musi zawierać ${specialChars?.join(",")}`);
    case sameAs && sameAs !== state:
      throw new Error(`${name} się nie zgadza`);
    default:
      return true;
  }
}

export const useValidationState = (
  inputName: string,
  validationOptions: validationData
) => {
  const [value, setValue] = useState("");
  const [isEmpty, setIsEmpty] = useState(value.length === 0);
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);


  useLayoutEffect(() => {
    setShowError(!(isEmpty || isValid));
  }, [isEmpty, isValid]);

  useLayoutEffect(() => {
    try {
      setIsEmpty(value.length === 0);
      checkIsValid(value, inputName, validationOptions);
      setIsValid(true);
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;
      setErrorMessage(message);
      setIsValid(false);
    }
  }, [value, validationOptions.sameAs]);
  return {
    value,
    setValue,
    isEmpty,
    isValid,
    error: { show: showError, message: errorMessage },
  };
};
