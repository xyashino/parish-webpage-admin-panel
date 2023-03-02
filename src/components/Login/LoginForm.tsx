import React, { SyntheticEvent } from "react";
import { LoginInput } from "@components/Login/LoginInput";
import { useNavigate } from "react-router-dom";
import { PageRouter } from "@enums/page-router.enum";
import { Btn } from "@components/ui/Btn";
import { useValidationState } from "@hooks/useValidationState";
import { ErrorAlert } from "@components/alerts/ErrorAlert";
import { useValidationButton } from "@hooks/useValidationButton";
import { useAxios } from "@hooks/useAxios";

const LOGIN_INPUT_NAME = "email";
const PASSWORD_INPUT_NAME = "password";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { loading, err:{data,hideError}, fetchDataUsingAxios } = useAxios();

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

  const goToHomePage = () => {
    navigate(PageRouter.Home);
  };
  const logIn = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!isEmailValid || !isPwdValid) return;
    const config = {
      method: "post",
      data: { email: emailValue, password: pwdValue },
    };
    await fetchDataUsingAxios("/auth/login", config, goToHomePage);
  };

  return (
    <form
      className="flex flex-col items-center space-y-4"
      onSubmit={(e) => logIn(e)}
      noValidate
    >
      <LoginInput
        type="email"
        placeholder="email@test.com"
        labelText="Email:"
        name={LOGIN_INPUT_NAME}
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
        error={emailError}
      />
      <LoginInput
        typeCheckbox={["password", "text"]}
        placeholder="*********"
        labelText="Hasło:"
        name={PASSWORD_INPUT_NAME}
        value={pwdValue}
        onChange={(e) => setPwdValue(e.target.value)}
        error={pwdError}
      />

      <div className="form-control mt-6">
        <Btn className={`btn-wide btn ${btnStyles} ${loading ? 'loading' : ''}`}>Zaloguj</Btn>
      </div>
      {data.show ? (
        <ErrorAlert onClick={hideError} message={data.message} />
      ) : null}
    </form>
  );
};
