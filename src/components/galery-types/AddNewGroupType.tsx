import React, { FormEvent, SyntheticEvent, useState } from "react";
import { Btn } from "@components/ui/Btn";
import { useAxios } from "@hooks/useAxios";
import { ErrorAlert } from "@components/alerts/ErrorAlert";
import { PageRouter } from "@enums/page-router.enum";
import { useRevalidator } from "react-router-dom";
import { CreateAlbumType } from "@backendTypes";
import { InputLabel } from "@components/ui/InputLabel";

enum InputName {
  name = "name",
  order = "order",
}
interface Props {
  hideModal: (e?: any) => void;
}

export const AddNewGroupType = ({ hideModal }: Props) => {
  const [inputsValues, setInputsValues] = useState({
    name: "",
    order: "-1",
  });
  const {
    loading,
    err: { data, hideError },
    fetchDataUsingAxios,
  } = useAxios();
  const { revalidate } = useRevalidator();

  const toggleClasses =
    inputsValues.name === "" ? "btn-disabled" : loading ? "loading" : "";

  const runAfterSuccess = () => {
    hideModal();
    revalidate();
  };
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { order, name } = inputsValues;
    const config = {
      method: "POST",
      data: { name, order: +order } as CreateAlbumType,
    };
    await fetchDataUsingAxios(PageRouter.AlbumTypes, config, runAfterSuccess);
  };

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value, name } = e.target as HTMLInputElement;
    if (name === InputName.name)
      setInputsValues(({ name, ...rest }) => ({ ...rest, name: value }));
    if (name === InputName.order && +value <= 100 && +value >= -100)
      setInputsValues(({ order, ...rest }) => ({ ...rest, order: value }));
  };

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
        value={inputsValues.name}
        onChange={handleInputChange}
        name={InputName.name}
      />
      <InputLabel
        labelName="Order: "
        value={inputsValues.order}
        onChange={handleInputChange}
        type="number"
        name={InputName.order}
      />
      <Btn className={`btn-wide btn ${toggleClasses}`}>Dodaj</Btn>
      {ErrorElement}
    </form>
  );
};
