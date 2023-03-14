import { Album } from "@backendTypes";
import { Btn } from "@components/ui/Btn";
import React, { FormEvent, SyntheticEvent, useState } from "react";
import { InputLabel } from "@components/ui/InputLabel";
import { useAxios } from "@hooks/useAxios";
import { PageRouter } from "@enums/page-router.enum";
import { ErrorAlert } from "@components/alerts/ErrorAlert";
import { AxiosRequestConfig } from "axios";
import {useRevalidator} from "react-router-dom";

enum INPUT_NAME {
  title = "title",
  subtitle = "subtitle",
}
interface Props {
  data: Album;
}
export const GalleryEditForm = ({ data }: Props) => {
  const arrayFromEnum = Object.keys(INPUT_NAME);
  const {revalidate} = useRevalidator()
  const {
    err: { data: errorData, hideError },
      loading,
    fetchDataUsingAxios,
  } = useAxios();

  const [inputsValue, setInputsValue] = useState({
    [INPUT_NAME.title]: data.title,
    [INPUT_NAME.subtitle]: data.subtitle ?? "",
  });

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value, name } = e.target as HTMLInputElement | HTMLSelectElement;
    if (arrayFromEnum.includes(name)) {
      setInputsValue((prevState) => ({ ...prevState, [name]: value }));
    }
  };
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const config: AxiosRequestConfig = {
      method: "PATCH",
      data: {
        title: inputsValue[INPUT_NAME.title],
        ...(inputsValue[INPUT_NAME.subtitle] === ""
          ? {}
          : { subtitle: inputsValue[INPUT_NAME.subtitle] }),
      } as Partial<Album>,
    };
    await fetchDataUsingAxios(`${PageRouter.Albums}/${data.id}`, config);
    revalidate()
  };

  const toggleLoadingClass = loading ? "loading" : "";

  const errorElement = errorData.show ? (
    <ErrorAlert onClick={hideError} message={errorData.message} />
  ) : null;

  return (
    <>
      <form
        className="rounded-box mt-4 flex w-5/6 flex-col items-center space-y-4 bg-base-200 p-8"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold uppercase ">Edytuj Album:</h2>
        <div className="my-auto w-3/5">
          <InputLabel
            labelName="Tytuł:"
            value={inputsValue[INPUT_NAME.title]}
            name={INPUT_NAME.title}
            onChange={handleInputChange}
          />
          <InputLabel
            labelName="Podtytuł:"
            value={inputsValue[INPUT_NAME.subtitle]}
            name={INPUT_NAME.subtitle}
            onChange={handleInputChange}
          />
        </div>
        <Btn className={`btn-wide btn ${toggleLoadingClass} `}>Zapisz</Btn>
        {errorElement}
      </form>
    </>
  );
};
