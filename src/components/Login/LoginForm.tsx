import React, { SyntheticEvent, useLayoutEffect, useState } from "react";
import { LoginInput } from "@components/Login/LoginInput";
import { HttpRequest } from "@utils/network/http-request";
import { useNavigate } from "react-router-dom";
import { PageRouter } from "@enums/page-router.enum";
import { Btn } from "@components/ui/Btn";
import { ErrorAlert } from "@components/alerts/ErrorAlert";

const LOGIN_INPUT_NAME = "email";
const PASSWORD_INPUT_NAME = "password";

export const LoginForm = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    show: false,
    message: "",
  });

  const [validData, setValidData] = useState({
    email: true,
    password: true,
  });

  const [disableBtn, setDisableBtn] = useState(true);
  const disableError = () => {
    setError(({ show, ...rest }) => ({ show: false, ...rest }));
  };

  const handleInput = (e: SyntheticEvent) => {
    e.preventDefault();
    disableError();
    const { name, value } = e.target as HTMLInputElement;
    if (name === LOGIN_INPUT_NAME) {
      setLoginData(({ email, ...rest }) => ({ email: value, ...rest }));
      return;
    }
    setLoginData(({ password, ...rest }) => ({ password: value, ...rest }));
  };

  useLayoutEffect(() => {
    setValidData(() => {
      const { password, email } = loginData;
      const validEmail = email.length === 0 || email.includes("@");
      const validPassword = password.length === 0 || password.length >= 8;

      return {
        password: validPassword,
        email: validEmail,
      };
    });
  }, [loginData]);

  useLayoutEffect(() => {
    const { password, email } = loginData;
    setDisableBtn(() => {
      if (loginData.email.length === 0 || loginData.password.length === 0) {
        return true;
      }
      return !(
        (password.length === 0 || password.length >= 8) &&
        (email.length === 0 || email.includes("@"))
      );
    });
  }, [validData]);

  const logIn = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { email, password } = loginData;
    if (!email || !password) return;
    try {
      await HttpRequest.post("/auth/login", {
        email,
        password,
      });
      navigate(PageRouter.Home);
    } catch (error) {
      setError(() => ({
        show: true,
        message: (error as any).response.data.error,
      }));
    }
  };

  return (
    <form
      className="flex flex-col items-center space-y-4"
      onSubmit={(e) => logIn(e)}
    >
      <LoginInput
        type="email"
        placeholder="email@test.com"
        labelText="Email:"
        name={LOGIN_INPUT_NAME}
        value={loginData.email}
        onChange={(e) => handleInput(e)}
        className={`${validData.email ? "" : "input-error"}`}
        tooltip="Email musi posiadać @"
      />
      <LoginInput
        type="password"
        placeholder="*********"
        labelText="Hasło:"
        name={PASSWORD_INPUT_NAME}
        value={loginData.password}
        onChange={(e) => handleInput(e)}
        className={`${validData.password ? "" : "input-error"}`}
        tooltip="Hasło musi posiadać min 8 znaków"
      />

      <div className="form-control mt-6">
        <Btn
          className={`btn-wide btn btn-${disableBtn ? "disabled" : "primary"}`}
        >
          Zaloguj
        </Btn>
      </div>

      {error.show ? (
        <ErrorAlert onClick={disableError} message={error.message} />
      ) : null}
      {/*<a className="link-primary link">Zapomniałem hasła</a>*/}
    </form>
  );
};
