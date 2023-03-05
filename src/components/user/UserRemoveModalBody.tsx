import { Btn } from "@components/ui/Btn";
import React, { SyntheticEvent, useRef } from "react";
import { useRevalidator } from "react-router-dom";
import { PageRouter } from "@enums/page-router.enum";
import { UsersResponse } from "@backendTypes";
import { ErrorAlert } from "@components/alerts/ErrorAlert";
import { useAxios } from "@hooks/useAxios";
const BASE_DELETE_USER = "delete-user/";

interface Props {
  id: UsersResponse["id"];
  email: UsersResponse["email"];
  hideModal: (e?: any) => void;
}

export const UserRemoveModalBody = ({ email, hideModal, id }: Props) => {
  const {
    loading,
    err: { hideError, showError, data },
    fetchDataUsingAxios,
  } = useAxios();
  const inputRef = useRef<HTMLInputElement>(null);
  const { revalidate } = useRevalidator();

  const runAfterSuccess = () => {
    hideModal();
    revalidate();
  };
  const handleClick = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (
      inputRef.current &&
      BASE_DELETE_USER + email !== inputRef.current.value
    ) {
      showError("Przepisałeś zły teskts");
      return;
    }
    const config = {
      method: "delete",
    };
    await fetchDataUsingAxios(
      `${PageRouter.Users}/${id}`,
      config,
      runAfterSuccess
    );
  };

  const handleLoadingStyles = loading ? "loading" : "";
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
      <Btn
        addClasses={`block btn-wide ml-4 ${handleLoadingStyles}`}
        onClick={handleClick}
      >
        Usuń
      </Btn>
      {data.show ? (
        <ErrorAlert onClick={hideError} message={data.message} />
      ) : null}
    </div>
  );
};
