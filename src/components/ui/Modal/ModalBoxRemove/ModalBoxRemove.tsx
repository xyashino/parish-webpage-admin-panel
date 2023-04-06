import { Btn } from "@components/ui/Btn";
import React, { ReactNode, SyntheticEvent, useState } from "react";
import { CustomErrorAlert } from "@components/alerts/CustomErrorAlert";
import { ModalBoxRemoveLabel } from "@components/ui/Modal/ModalBoxRemove/ModalBoxRemoveLabel";

interface Props {
  deleteInfoElement: ReactNode;
  hideModal: (e?: any) => void;
  mustTypeToDelete: string;
  loading: boolean;
  isError: boolean;
  showError: (message: string) => void;
  errorMessage: string;
  hideError: (e?: any) => void;
  removeMethod: () => void;
}

export const ModalBoxRemove = ({
  deleteInfoElement,
  isError,
  loading,
  mustTypeToDelete,
  hideError,
  showError,
  errorMessage,
  removeMethod,
}: Props) => {
  const [inputValue, setValue] = useState("");
  const handleLoadingStyles = loading ? "loading" : "";

  const ErrorElement = isError ? (
    <CustomErrorAlert handleClick={hideError} errorMessage={errorMessage} />
  ) : null;

  const mustType = mustTypeToDelete.trim().replaceAll(" ", "-");
  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    if (mustType !== inputValue) {
      showError("Podałeś zły teskt");
      return
    }
    removeMethod();
  };

  return (
    <div className="space-y-4 p-4 text-center">
      <p className="text-xl">{deleteInfoElement}</p>
      <p>
        Żeby to zrobić przepisz <span className="font-bold">{mustType}</span>
      </p>
      <ModalBoxRemoveLabel inputValue={inputValue} setValue={setValue} />
      <Btn
        addClasses={`block btn-wide ml-4 ${handleLoadingStyles}`}
        onClick={handleClick}
      >
        Usuń
      </Btn>
      {ErrorElement}
    </div>
  );
};
