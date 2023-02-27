import { MutableRefObject, useLayoutEffect, useState } from "react";

interface validationData {
  min: number;
  max?: number;
  specialChars?: string[];
  sameAs?: MutableRefObject<string | null>;
}

const checkIsValid = (
  state: string,
  name: string,
  { min, specialChars, max, sameAs }: validationData
): true => {
  const { length } = state;
  if (length < min) throw new Error(`${name} musi mieć min. ${min} znaków`);
  if (max && length > max)
    throw new Error(`${name} musi mieć max. ${max} znaków`);
  specialChars?.forEach((char) => {
    if (!state.includes(char))
      throw Error(`${name} musi zawierać ${specialChars?.join(",")}`);
  });
  if (sameAs && sameAs.current !== state) throw Error(`${name} nie jest same`);
  return true;
};

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
  }, [value]);
  return {
    value,
    setValue,
    isEmpty,
    isValid,
    error: { show: showError, message: errorMessage },
  };
};
