import { ExpandableContent } from "@components/ui/ExpandableContent";
import { Btn } from "@components/ui/Btn";
import React, { SyntheticEvent } from "react";

import { useValidationState } from "@hooks/useValidationState";
import { LoginInput } from "@components/login/LoginInput";
import { useCustomConfirmAlert } from "@hooks/useCustomConfirmAlert";
import { CustomConfirmAlert } from "@components/alerts/CustomConfirmAlert";
import { useValidationButton } from "@hooks/useValidationButton";
import { CustomErrorAlert } from "@components/alerts/CustomErrorAlert";
import { useAxios } from "@hooks/useAxios";
import { PageRouter } from "@enums/page-router.enum";
import { AxiosRequestConfig } from "axios";

const INPUT_NAMES = {
  oldPassword: "oldPassword",
  newPassword: "newPassword",
  confirmPassword: "confirmPassword",
};
export const UserChangePassword = () => {
  const { alertData, configureAlert } = useCustomConfirmAlert();
  const {
    err: { hideError, data },
    loading,
    fetchDataUsingAxios,
  } = useAxios();


  const {
    setValue: setOldPwdValue,
    value: oldPwdValue,
    isValid: isOldPwdValid,
    error: oldPwdError,
  } = useValidationState("Hasło", {
    minLength: 8,
    maxLength: 255,
  });

  const {
    setValue: setNewPwdValue,
    value: newPwdValue,
    isValid: isNewPwdValid,
    error: newPwdError,
  } = useValidationState("Hasło", {
    minLength: 8,
    maxLength: 255,
  });

  const {
    setValue: setConfirmPwdValue,
    value: confirmPwdValue,
    isValid: isConfirmPwdValid,
    error: confirmPwdError,
  } = useValidationState("Hasło", {
    minLength: 8,
    maxLength: 255,
    sameAs: newPwdValue,
  });
  const { result: btnStyles } = useValidationButton(
    [isNewPwdValid, isOldPwdValid, isConfirmPwdValid],
    "",
    "btn-disabled"
  );

  const updatePassword = async () => {
    const config: AxiosRequestConfig = {
      method: "patch",
      data: {
        password: oldPwdValue,
        newPassword: newPwdValue,
      },
    }
    await fetchDataUsingAxios(PageRouter.Current, config );
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    configureAlert("Czy napewno chcesz zmienic hasło?", updatePassword);
  };

  const toggleLoadingClass = loading ? 'loading' : '';

  return (
    <ExpandableContent title="Zmień Hasło">
      <form
        className="flex w-full flex-col items-center justify-center bg-accent p-4"
        onSubmit={(e) => handleSubmit(e)}
        noValidate
      >
        <LoginInput
          typeCheckbox={["password", "text"]}
          placeholder="********"
          name={INPUT_NAMES.oldPassword}
          value={oldPwdValue}
          labelText="Stare Hasło:"
          onChange={(e) => setOldPwdValue(e.target.value)}
          error={oldPwdError}
        />
        <LoginInput
          typeCheckbox={["password", "text"]}
          placeholder="********"
          name={INPUT_NAMES.newPassword}
          value={newPwdValue}
          labelText="Nowe Hasło:"
          onChange={(e) => setNewPwdValue(e.target.value)}
          error={newPwdError}
        />

        <LoginInput
          typeCheckbox={["password", "text"]}
          value={confirmPwdValue}
          name={INPUT_NAMES.confirmPassword}
          placeholder="********"
          labelText="Powtórz Hasło:"
          onChange={(e) => setConfirmPwdValue(e.target.value)}
          error={confirmPwdError}
        />

        <Btn className={`btn-wide  btn ${btnStyles} ${toggleLoadingClass}`}>Zmień hasło</Btn>
        {alertData.isVisible ? <CustomConfirmAlert confirmConfig={alertData.config} /> : null}
        {data.show ? (
          <CustomErrorAlert errorMessage={data.message} handleClick={hideError}/>
        ) : null}
      </form>
    </ExpandableContent>
  );
};
