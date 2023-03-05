import { Btn } from "@components/ui/Btn";
import React, { ReactNode, SyntheticEvent, useState } from "react";
import { ErrorAlert } from "@components/alerts/ErrorAlert";
import { ModalBoxRemoveLabel } from "@components/ui/Modal/ModalBoxRemove/ModalBoxRemoveLabel";

interface Props {
  deleteInfoElement: ReactNode;
  hideModal: (e?: any) => void;
  mustTypeToDelete: string;
  loading: boolean;
  showError: boolean;
  errorMessage: string;
  hideError: (e?: any) => void;
  btnClick: (e: SyntheticEvent, value: string) => void;
}

export const ModalBoxRemove = ({
  deleteInfoElement,
  btnClick,
  loading,
  mustTypeToDelete,
  hideError,
  showError,
  errorMessage,
}: Props) => {
  const [inputValue, setValue] = useState("");
  const handleLoadingStyles = loading ? "loading" : "";

  const ErrorElement = showError ? (
    <ErrorAlert onClick={hideError} message={errorMessage} />
  ) : null;

  return (
    <div className="space-y-4 p-4 text-center">
      <p className="text-xl">{deleteInfoElement}</p>
      <p>
        Żeby to zrobić przepisz{" "}
        <span className="font-bold">{mustTypeToDelete}</span>
      </p>
      <ModalBoxRemoveLabel inputValue={inputValue} setValue={setValue} />
      <Btn
        addClasses={`block btn-wide ml-4 ${handleLoadingStyles}`}
        onClick={(e) => btnClick(e, inputValue)}
      >
        Usuń
      </Btn>
      {ErrorElement}
    </div>
  );
};
