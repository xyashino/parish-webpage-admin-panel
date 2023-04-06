import React, { SyntheticEvent } from "react";
import { ExpandableContent } from "@components/ui/ExpandableContent";
import { Btn } from "@components/ui/Btn";
import { PageRouter } from "@enums/page-router.enum";
import { useValidationState } from "@hooks/useValidationState";
import { LoginInput } from "@components/login/LoginInput";
import { useCustomConfirmAlert } from "@hooks/useCustomConfirmAlert";
import { CustomConfirmAlert } from "@components/alerts/CustomConfirmAlert";
import { useValidationButton } from "@hooks/useValidationButton";
import { useAxios } from "@hooks/useAxios";
import { CustomErrorAlert } from "@components/alerts/CustomErrorAlert";
import {AxiosRequestConfig} from "axios";
import {useRevalidator} from "react-router-dom";

const NEW_EMAIL_NAME = "email";
const PASSWORD_NAME = "password";

export const UserChangeEmail = () => {
  const { alertData, configureAlert } = useCustomConfirmAlert();
  const {revalidate} = useRevalidator()

  const {
    err: { hideError, data },
    loading,
    fetchDataUsingAxios,
  } = useAxios();

  const {
    setValue: setEmailValue,
    value: emailValue,
    isValid: isEmailValid,
    error: emailError,
  } = useValidationState("Email", {
    minLength: 3,
    maxLength: 255,
    specialChars: ["@"],
  });

  const {
    setValue: setPwdValue,
    value: pwdValue,
    isValid: isPwdValid,
    error: pwdError,
  } = useValidationState("Hasło", {
    minLength: 8,
    maxLength: 255,
  });

  const { result: btnStyles } = useValidationButton(
    [isPwdValid, isEmailValid],
    "",
    "btn-disabled"
  );

  const changeEmail = async () => {
    if (!isPwdValid || !isEmailValid) return;
    const config:AxiosRequestConfig = {
      method: "patch",
      data: {
        email: emailValue,
        password: pwdValue,
      },
    };
    await fetchDataUsingAxios(PageRouter.Current, config, ()=> revalidate());
  };

  const toggleLoadingClass = loading ? "loading" : "";
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    configureAlert("Czy napewno chcesz zmienic e-mail?", changeEmail);
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
          typeCheckbox={["password", "text"]}
          value={pwdValue}
          name={PASSWORD_NAME}
          placeholder="********"
          labelText="Hasło:"
          onChange={(e) => setPwdValue(e.target.value)}
          error={pwdError}
        />
        <Btn className={`btn-wide btn ${btnStyles} ${toggleLoadingClass}`}>Zmień E-mail</Btn>

        {alertData.isVisible ? <CustomConfirmAlert confirmConfig={alertData.config} /> : null}
        {data.show ? (
          <CustomErrorAlert handleClick={hideError} errorMessage={data.message} />
        ) : null}
      </form>
    </ExpandableContent>
  );
};
