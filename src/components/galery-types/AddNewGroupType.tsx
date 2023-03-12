import React, { SyntheticEvent, useState } from "react";
import { Btn } from "@components/ui/Btn";
import { useAxios } from "@hooks/useAxios";
import { ErrorAlert } from "@components/alerts/ErrorAlert";
import { PageRouter } from "@enums/page-router.enum";
import { useRevalidator } from "react-router-dom";
import { CreateAlbumType } from "@backendTypes";
import { InputLabel } from "@components/ui/InputLabel";

interface Props {
  hideModal: (e?: any) => void;
}

export const AddNewGroupType = ({ hideModal }: Props) => {
  const [value, setValue] = useState("");
  const {
    loading,
    err: { data, hideError },
    fetchDataUsingAxios,
  } = useAxios();
  const { revalidate } = useRevalidator();
  const toggleClasses =
    value === "" ? "btn-disabled" : loading ? "loading" : "";

  const runAfterSuccess = () => {
    hideModal();
    revalidate();
    setValue("");
  };
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const config = { method: "POST", data: { name: value } as CreateAlbumType };
    await fetchDataUsingAxios(PageRouter.AlbumTypes, config, runAfterSuccess);
  };
  const handleInputChange = (e: SyntheticEvent) =>
    setValue((e.target as HTMLInputElement).value);
  const ErrorElement = data.show ? (
    <ErrorAlert onClick={hideError} message={data.message} />
  ) : null;

  return (
    <form
      className="flex flex-col items-center space-y-4"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div>
        <h2 className="text-2xl font-bold uppercase ">Dodaj nową grupe</h2>
        <p className="uppercase text-error">Nazwa powinna być unikatowa !!</p>
      </div>
      <InputLabel
        labelName="Nazwa : "
        value={value}
        onChange={handleInputChange}
      />
      <Btn className={`btn-wide btn ${toggleClasses}`}>Dodaj</Btn>
      {ErrorElement}
    </form>
  );
};
