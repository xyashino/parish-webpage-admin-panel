import React, { SyntheticEvent } from "react";
import { LoginInput } from "@components/login/LoginInput";
import { useNavigate } from "react-router-dom";
import { PageRouter } from "@enums/page-router.enum";
import { Btn } from "@components/ui/Btn";
import { useValidationState } from "@hooks/useValidationState";
import { CustomErrorAlert } from "@components/alerts/CustomErrorAlert";
import { useValidationButton } from "@hooks/useValidationButton";
import { useAxios } from "@hooks/useAxios";

const LOGIN_INPUT_NAME = "email";
const PASSWORD_INPUT_NAME = "password";

export const LoginForm = () => {
  const navigate = useNavigate();
  const {
    loading,
    err: { data, hideError },
    fetchDataUsingAxios,
  } = useAxios();

  const {
    setValue: setEmail,
    value: email,
    isValid: isEmailValid,
    error: emailError,
  } = useValidationState("Email", {
    minLength: 3,
    maxLength: 255,
    specialChars: ["@"],
  });

  const {
    setValue: setPassword,
    value: password,
    isValid: isPasswordValid,
    error: passwordError,
  } = useValidationState("Hasło", {
    minLength: 8,
    maxLength: 255,
  });

  const { result: buttonStyles } = useValidationButton(
    [isPasswordValid, isEmailValid],
    "",
    "btn-disabled"
  );

  const navigateToHomePage = () => {
    navigate(PageRouter.Main);
  };
  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!isEmailValid || !isPasswordValid) return;
    const config = {
      method: "post",
      data: { email: email, password: password },
    };
    await fetchDataUsingAxios("/auth/login", config, navigateToHomePage);
  };

  const loadingClass = loading ? "loading" : "";

  return (
    <form
      className="flex flex-col items-center space-y-4"
      onSubmit={(e) => handleLogin(e)}
      noValidate
    >
      <LoginInput
        type="email"
        placeholder="email@test.com"
        labelText="Email:"
        name={LOGIN_INPUT_NAME}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={emailError}
      />
      <LoginInput
        typeCheckbox={["password", "text"]}
        placeholder="*********"
        labelText="Hasło:"
        name={PASSWORD_INPUT_NAME}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={passwordError}
      />

      <div className="form-control mt-6">
        <Btn className={`btn-wide btn ${buttonStyles} ${loadingClass}`}>
          Zaloguj
        </Btn>
      </div>
      {data.show ? (
        <CustomErrorAlert handleClick={hideError} errorMessage={data.message} />
      ) : null}
    </form>
  );
};
