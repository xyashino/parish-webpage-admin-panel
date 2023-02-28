import { Btn } from "@components/ui/Btn";
import React, { SyntheticEvent, useRef } from "react";
import { useRevalidator } from "react-router-dom";
import { AxiosBase } from "@utils/network/axios-base";
import { PageRouter } from "@enums/page-router.enum";
import { UsersResponse } from "@backendTypes";
import { AxiosError } from "axios";
import { ErrorAlert } from "@components/alerts/ErrorAlert";
import { useErrorAlert } from "@hooks/useErrorAlert";
const BASE_DELETE_USER = "delete-user/";

interface Props {
  id: UsersResponse["id"];
  email: UsersResponse["email"];
  hideModal: (e: any) => void;
}

export const UserRemoveModalBody = ({ email, hideModal, id }: Props) => {
  const { errorData, hideError, showError } = useErrorAlert();
  const inputRef = useRef<HTMLInputElement>(null);
  const { revalidate } = useRevalidator();
  const handleClick = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (
      inputRef.current &&
      BASE_DELETE_USER + email !== inputRef.current.value
    ) {
      showError("Przepisałeś zły teskts");
      return;
    }

    try {
      await AxiosBase.delete(PageRouter.Users + "/" + id);
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof AxiosError)
        message = error.response?.data.message ?? error.message;
      showError(message);
      return
    }
    hideModal(e);
    revalidate();
  };

  return (
    <div className="space-y-4 p-4 text-center">
      <p className="text-xl">
        Czy na pewno chcesz usunąc <span className="font-bold">{email}</span> ?
      </p>
      <p>
        Żeby to zrobić przepisz{" "}
        <span className="font-bold">
          {BASE_DELETE_USER}
          {email}
        </span>
      </p>
      <label className="p-2 text-xl">
        <input
          type="text"
          placeholder="Type here"
          className="input"
          ref={inputRef}
        />
      </label>
      <Btn addClasses="block btn-wide ml-4" onClick={handleClick}>
        Usuń
      </Btn>
      {errorData.show ? (
        <ErrorAlert onClick={hideError} message={errorData.message} />
      ) : null}
    </div>
  );
};
