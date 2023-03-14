import React, { FormEvent, SyntheticEvent, useState } from "react";
import { useAxios } from "@hooks/useAxios";
import { useRevalidator } from "react-router-dom";
import { AlbumTypeResponse, CreateAlbumType } from "@backendTypes";
import { InputLabel } from "@components/ui/InputLabel";
import { Btn } from "@components/ui/Btn";
import { ErrorAlert } from "@components/alerts/ErrorAlert";

enum InputName {
  name = "name",
  order = "order",
}
interface Props {
  hideModal: (e?: any) => void;
  data: AlbumTypeResponse;
}

export const EditGroupModalBody = ({ hideModal, data }: Props) => {
  const { name, id, order } = data;
  const {
    err: { data: errorData, hideError },
    fetchDataUsingAxios,
  } = useAxios();
  const { revalidate } = useRevalidator();

  const [inputsValues, setInputsValues] = useState({
    name: name,
    order: `${order}`,
  });
  const runAfterSuccess = () => {
    hideModal();
    revalidate();
  };
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await fetchDataUsingAxios(
      `albums/types/${id}`,
      {
        method: "PATCH",
        data: {
          ...(inputsValues.name === name ? {} : {name:inputsValues.name}),
          order: +inputsValues.order,
        } as CreateAlbumType,
      },
      runAfterSuccess
    );
  };

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value, name } = e.target as HTMLInputElement;
    if (name === InputName.name)
      setInputsValues(({ name, ...rest }) => ({ ...rest, name: value }));
    if (name === InputName.order && +value <= 100 && +value >= -100)
      setInputsValues(({ order, ...rest }) => ({ ...rest, order: value }));
  };

  const errorElement = errorData.show ? (
    <ErrorAlert onClick={hideError} message={errorData.message} />
  ) : null;

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-3xl font-bold uppercase">Edytuj Grupe:</h2>
      <form
        onSubmit={handleSubmit}
        className="flex w-1/2 flex-col items-center space-y-4"
      >
        <InputLabel
          name={InputName.name}
          labelName="Nazwa:"
          value={inputsValues.name}
          onChange={handleInputChange}
        />
        <InputLabel
          name={InputName.order}
          labelName="Order:"
          value={inputsValues.order}
          type="number"
          onChange={handleInputChange}
        />
        <Btn className="btn-wide btn">Zapisz</Btn>
        {errorElement}
      </form>
    </div>
  );
};
