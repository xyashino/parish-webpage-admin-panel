import { SyntheticEvent, useEffect, useState } from "react";
import { MyLabel } from "@components/ui/MyLabel";
import { ExpandableContent } from "@components/ui/ExpandableContent";
import { Btn } from "@components/ui/Btn";
import { HttpRequest } from "@utils/network/http-request";
import { PageRouter } from "@enums/page-router.enum";
import { ErrorAlert } from "@components/alerts/ErrorAlert";

const NEW_EMAIL_NAME = "email";
const PASSWORD_NAME = "password";

export const UserChangeEmail = () => {
  const [data, setData] = useState({
    pwd: "",
    email: "",
  });
  const [areValidData, setAreValidData] = useState({
    pwd: true,
    email: true,
  });

  const [alert, setAlert] = useState({
    show: false,
    message: "",
  });

  useEffect(() => {
    setAreValidData(() => ({
      pwd: data.pwd.length >= 8 || data.pwd.length === 0,
      email: data.email.includes("@") || data.email.length === 0,
    }));
  }, [data]);

  const clearAlert = () =>
    setAlert(({ message }) => ({ show: false, message }));

  const changeData = (e: SyntheticEvent) => {
    e.preventDefault();
    clearAlert();
    const { value, name } = e.target as HTMLInputElement;
    if (name === PASSWORD_NAME) {
      setData(({  email }) => ({ email, pwd: value }));
      return;
    }
    setData(({ pwd }) => ({ email: value, pwd }));
  };

  const changeEmail = async (event: SyntheticEvent) => {
    event.preventDefault();
    const { email, pwd } = data;
    if (pwd.length < 8 || !email.includes("@")) return;
    try {
      await HttpRequest.patch(PageRouter.Current, {
        email,
        password: pwd,
      });
    } catch (e: any) {
      setAlert(() => ({
        show: true,
        message: e.response.data.message,
      }));
    }
  };

  return (
    <ExpandableContent title="Zmień E-mail">
      <form className="flex w-full flex-col items-center justify-center bg-accent p-4">
        <MyLabel
          type="email"
          value={data.email}
          name={NEW_EMAIL_NAME}
          placeholder="e-mail"
          text="Nowy Email:"
          textClassName="p-4"
          className={`input ${areValidData.email ? "" : "input-error"}`}
          labelClassName="flex items-center  justify-center"
          onChange={(e) => changeData(e)}
        />
        <MyLabel
          type="password"
          name={PASSWORD_NAME}
          value={data.pwd}
          placeholder="********"
          text=" Hasło:"
          className={`input ${areValidData.pwd ? "" : "input-error"}`}
          textClassName="p-4"
          labelClassName="flex items-center  justify-center"
          onChange={(e) => changeData(e)}
        />

        <Btn
          onClick={(e) => changeEmail(e)}
          className={`btn mb-8 ${
            data.pwd.length === 0 || data.email.length === 0
              ? "btn-disabled"
              : areValidData.email && areValidData.pwd
              ? "btn-primary"
              : "btn-disabled"
          }`}
        >
          Zmień E-mail
        </Btn>

        {alert.show ? (
          <ErrorAlert onClick={clearAlert} message={alert.message} />
        ) : null}
      </form>
    </ExpandableContent>
  );
};
