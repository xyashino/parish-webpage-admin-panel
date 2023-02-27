import React, { SyntheticEvent } from "react";
import { ExpandableContent } from "@components/ui/ExpandableContent";
import { Btn } from "@components/ui/Btn";
import { AxiosBase } from "@utils/network/axios-base";
import { PageRouter } from "@enums/page-router.enum";
import { useValidationState } from "@hooks/useValidationState";
import { LoginInput } from "@components/Login/LoginInput";
import { useConfirmAlert } from "@hooks/useConfirmAlert";
import { ConfirmAlert } from "@components/alerts/ConfirmAlert";
import { useValidationButton } from "@hooks/useValidationButton";

const NEW_EMAIL_NAME = "email";
const PASSWORD_NAME = "password";

export const UserChangeEmail = () => {
  const { alertData, setConfig } = useConfirmAlert();

  const {
    setValue: setEmailValue,
    value: emailValue,
    isValid: isEmailValid,
    error: emailError,
  } = useValidationState("Email", {
    min: 3,
    max: 255,
    specialChars: ["@"],
  });

  const {
    setValue: setPwdValue,
    value: pwdValue,
    isValid: isPwdValid,
    error: pwdError,
  } = useValidationState("Hasło", {
    min: 8,
    max: 255,
  });

  const { result: btnStyles } = useValidationButton(
    [isPwdValid, isEmailValid],
    "",
    "btn-disabled"
  );

  const changeEmail = async () => {
    if (!isPwdValid || !isEmailValid) return;
    try {
      await AxiosBase.patch(PageRouter.Current, {
        email: emailValue,
        password: pwdValue,
      });
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    setConfig("Czy napewno chcesz zmienic e-mail?", changeEmail);
  };

  return (
    <ExpandableContent title="Zmień E-mail">
      <form
        className="flex w-full flex-col items-center justify-center bg-accent p-4"
        onSubmit={(e) => handleSubmit(e)}
        noValidate
      >
        <LoginInput
          type="email"
          value={emailValue}
          name={NEW_EMAIL_NAME}
          placeholder="e-mail"
          labelText="Nowy Email:"
          onChange={(e) => setEmailValue(e.target.value)}
          error={emailError}
        />
        <LoginInput
          type="password"
          value={pwdValue}
          name={PASSWORD_NAME}
          placeholder="********"
          labelText="Hasło:"
          onChange={(e) => setPwdValue(e.target.value)}
          error={pwdError}
        />

        <Btn className={`btn-wide btn ${btnStyles}`}>Zmień E-mail</Btn>
        {alertData.show ? <ConfirmAlert config={alertData.config} /> : null}
      </form>
    </ExpandableContent>
  );
};
