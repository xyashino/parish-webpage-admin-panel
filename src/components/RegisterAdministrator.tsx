import React, { SyntheticEvent } from "react";
import { useValidationState } from "@hooks/useValidationState";
import { LoginInput } from "@components/Login/LoginInput";
import { Btn } from "@components/ui/Btn";
import { useValidationButton } from "@hooks/useValidationButton";
import { AxiosBase } from "@utils/network/axios-base";

import { ErrorAlert } from "@components/alerts/ErrorAlert";
import { useErrorAlert } from "@hooks/useErrorAlert";
import { AxiosError } from "axios";

const INPUT_NAMES = {
  email: "Email",
  password: "Hasło",
  confirmPassword: "tezrt",
};

export const RegisterAdministrator = () => {
  const { errorData, hideError, showError } = useErrorAlert();

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

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!(isConfirmPwdValid && isEmailValid && isPwdValid)) return;

    try {
      await AxiosBase.post("/users/register", {
        email: emailValue,
        password: pwdValue,
      });
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof AxiosError)
        message = error.request.data.message ?? error.message;
      showError(message);
    }
  };

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

        <Btn className={`btn-wide btn ${btnStyles} my-4`}>Zarejestruj</Btn>
        {errorData.show ? (
          <ErrorAlert onClick={hideError} message={errorData.message} />
        ) : null}
      </form>
    </div>
  );
};
