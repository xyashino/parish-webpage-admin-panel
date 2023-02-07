import { ExpandableContent } from "@components/ui/ExpandableContent";
import { MyLabel } from "@components/ui/MyLabel";
import { Btn } from "@components/ui/Btn";
import { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import { HttpRequest } from "@utils/network/http-request";
import { PageRouter } from "@enums/page-router.enum";
import { ErrorAlert } from "@components/alerts/ErrorAlert";

const OLD_PASSWORD_NAME = "oldPassword";
const NEW_PASSWORD_NAME = "newPassword";
const CONFIRM_PASSWORD_NAME = "confirmPassword";

export const UserChangePassword = () => {
  const [data, setData] = useState({
    oldPwd: "",
    newPwd: "",
    confirmPwd: "",
  });

  const [areValidData, setAreValidData] = useState({
    oldPwd: true,
    newPwd: true,
    confirmPwd: true,
  });

  const [btnStyle, setBtnStyle] = useState("btn-disabled");

  const [alert, setAlert] = useState({
    show: false,
    message: "",
  });
  const clearAlert = () =>
    setAlert(({ show, message }) => ({ show: false, message }));

  useEffect(() => {
    setAreValidData((prevState) => {
      const { newPwd, oldPwd, confirmPwd } = data;
      return {
        oldPwd: oldPwd.length >= 8 || oldPwd.length === 0,
        newPwd: newPwd.length >= 8 || newPwd.length === 0,
        confirmPwd:
          (confirmPwd.length >= 8 && confirmPwd === newPwd) ||
          newPwd.length === 0,
      };
    });
    setBtnStyle(() => enableBtn());
  }, [data]);

  const enableBtn = (): string => {
    const { newPwd, oldPwd, confirmPwd } = data;
    return newPwd.length === 0 || oldPwd.length === 0 || confirmPwd.length === 0
      ? "btn-disabled"
      : areValidData.oldPwd && areValidData.confirmPwd && areValidData.newPwd
      ? "btn-primary"
      : "btn-disabled";
  };

  const changeData = (e: FormEvent) => {
    e.preventDefault();
    clearAlert();
    const { value, name } = e.target as HTMLInputElement;
    if (name === OLD_PASSWORD_NAME) {
      setData(({ oldPwd, ...rest }) => ({ ...rest, oldPwd: value }));
      return;
    }
    if (name === NEW_PASSWORD_NAME) {
      setData(({ newPwd, ...rest }) => ({ ...rest, newPwd: value }));
      return;
    }
    setData(({ confirmPwd, ...rest }) => ({ ...rest, confirmPwd: value }));
  };

  const updatePwd = async (e: SyntheticEvent) => {
    e.preventDefault();
    clearAlert();
    const { newPwd, oldPwd, confirmPwd } = data;
    if (
      newPwd.length < 8 ||
      oldPwd.length < 8 ||
      confirmPwd.length < 8 ||
      newPwd !== confirmPwd
    )
      return;

    try {
      await HttpRequest.patch(PageRouter.Current, {
        password: oldPwd,
        newPassword: newPwd,
      });
    } catch (e) {
      setAlert(({ show, message }) => ({
        show: true,
        message: e.response.data.message,
      }));
    }
  };

  return (
    <ExpandableContent title="Zmień Hasło">
      <form className="flex w-full flex-col items-center justify-center bg-accent p-4">
        <MyLabel
          type="password"
          placeholder="********"
          name={OLD_PASSWORD_NAME}
          value={data.oldPwd}
          text="Hasło:"
          className={`input ${areValidData.oldPwd ? "" : "input-error"}`}
          textClassName="p-4"
          labelClassName="flex items-center  justify-center"
          onChange={(e) => changeData(e)}
        />
        <MyLabel
          placeholder="********"
          value={data.newPwd}
          name={NEW_PASSWORD_NAME}
          type="password"
          className={`input ${areValidData.newPwd ? "" : "input-error"}`}
          text="Nowe Hasło:"
          textClassName="p-4"
          onChange={(e) => changeData(e)}
          labelClassName="flex items-center  justify-center"
        />
        <MyLabel
          type="password"
          value={data.confirmPwd}
          name={CONFIRM_PASSWORD_NAME}
          placeholder="********"
          text="Powtórz Hasło:"
          className={`input ${areValidData.confirmPwd ? "" : "input-error"}`}
          labelClassName="flex items-center  justify-center"
          textClassName="p-4"
          onChange={(e) => changeData(e)}
        />

        <Btn className={`btn ${btnStyle}`} onClick={(e) => updatePwd(e)}>
          Zmień hasło
        </Btn>

        {alert.show ? (
          <ErrorAlert onClick={clearAlert} message={alert.message} />
        ) : null}
      </form>
    </ExpandableContent>
  );
};
