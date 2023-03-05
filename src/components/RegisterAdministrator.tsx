import React, { SyntheticEvent } from "react";
import { useValidationState } from "@hooks/useValidationState";
import { LoginInput } from "@components/login/LoginInput";
import { Btn } from "@components/ui/Btn";
import { useValidationButton } from "@hooks/useValidationButton";

import { ErrorAlert } from "@components/alerts/ErrorAlert";
import { useRevalidator } from "react-router-dom";
import { useAxios } from "@hooks/useAxios";
import {AxiosRequestConfig} from "axios";

interface Props {
  hideModal: (e?: SyntheticEvent) => void;
}

const INPUT_NAMES = {
  email: "Email",
  password: "Hasło",
  confirmPassword: "tezrt",
};

export const RegisterAdministrator = ({ hideModal }: Props) => {
  const { revalidate } = useRevalidator();
  const {loading, err:{hideError,data}, fetchDataUsingAxios } =
    useAxios();
  const {
    value: emailValue,
    error: emailError,
    setValue: setEmailValue,
    isValid: isEmailValid,
  } = useValidationState("Email", {
    min: 3,
    specialChars: ["@"],
  });
  const {
    value: pwdValue,
    error: pwdError,
    setValue: setPwdValue,
    isValid: isPwdValid,
  } = useValidationState("Hasło", {
    min: 8,
  });
  const {
    value: confirmPwdValue,
    error: confirmPwdError,
    setValue: setConfirmPwdValue,
    isValid: isConfirmPwdValid,
  } = useValidationState("Hasło", {
    min: 8,
    sameAs: pwdValue,
  });

  const { result: btnStyles } = useValidationButton(
    [isEmailValid, isPwdValid, isConfirmPwdValid],
    "",
    "btn-disabled"
  );

  const runAfterSuccess = ()=> {
    hideModal();
    revalidate();
  }
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!(isConfirmPwdValid && isEmailValid && isPwdValid)) return;

    const config:AxiosRequestConfig = {
      method: "post",
      data: {
        email: emailValue,
        password: pwdValue,
      },
    };
    await fetchDataUsingAxios("/users/register", config , runAfterSuccess);
  };
  const toggleLoadingStyles = loading ? "loading" : "";

  return (
    <div className="flex w-full flex-col justify-center border-b-2">
      <h2 className="w-full p-2 text-center text-xl font-semibold uppercase">
        Dodaj Nowego Administratora:
      </h2>
      <form className="flex flex-col items-center p-4" onSubmit={handleSubmit}>
        <LoginInput
          type="email"
          placeholder="example@email.com"
          value={emailValue}
          labelText="Email:"
          error={emailError}
          onChange={(e) => setEmailValue(e.target.value)}
          name={INPUT_NAMES.email}
        />
        <LoginInput
          typeCheckbox={["password", "text"]}
          placeholder="**********"
          value={pwdValue}
          labelText="Hasło:"
          error={pwdError}
          onChange={(e) => setPwdValue(e.target.value)}
          name={INPUT_NAMES.password}
        />
        <LoginInput
          placeholder="********"
          value={confirmPwdValue}
          labelText="Powtórz Hasło:"
          error={confirmPwdError}
          onChange={(e) => setConfirmPwdValue(e.target.value)}
          name={INPUT_NAMES.confirmPassword}
          typeCheckbox={["password", "text"]}
        />
        <Btn
          className={`btn-wide btn my-4 ${btnStyles} ${toggleLoadingStyles}`}
        >
          Zarejestruj
        </Btn>
        {data.show ? (
          <ErrorAlert onClick={hideError} message={data.message} />
        ) : null}
      </form>
    </div>
  );
};
