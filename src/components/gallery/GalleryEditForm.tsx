import { Album } from "@backendTypes";
import { Btn } from "@components/ui/Btn";
import React, { FormEvent, SyntheticEvent, useState } from "react";
import { InputLabel } from "@components/ui/InputLabel";
import { useAxios } from "@hooks/useAxios";
import { PageRouter } from "@enums/page-router.enum";
import { ErrorAlert } from "@components/alerts/ErrorAlert";
import { AxiosRequestConfig } from "axios";
import { useRevalidator } from "react-router-dom";
import { GalleryTypeSelect } from "@components/gallery/GalleryTypeSelect";
import { SuccessAlert } from "@components/alerts/SuccessAlert";

enum InputName {
  title = "title",
  subtitle = "subtitle",
  select = "select",
}
interface Props {
  data: Album;
}
export const GalleryEditForm = ({ data }: Props) => {
  const arrayFromEnum = Object.keys(InputName);
  const { revalidate } = useRevalidator();

  const [isSuccess, setIsSuccess] = useState(false);
  const hideSuccess = () => {
    setIsSuccess(false);
  };
  const {
    err: { data: errorData, hideError },
    loading,
    fetchDataUsingAxios,
  } = useAxios();

  const [inputsValues, setInputsValues] = useState({
    [InputName.title]: data.title,
    [InputName.subtitle]: data.subtitle ?? "",
    [InputName.select]: data.type?.id ?? "",
  });

  const handleInputChange = (
    e: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    const { value, name } = e.target as HTMLInputElement | HTMLSelectElement;
    if (arrayFromEnum.includes(name)) {
      setInputsValues((prevState) => ({ ...prevState, [name]: value }));
    }
  };
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { title, subtitle, select } = inputsValues;

    const config: AxiosRequestConfig = {
      method: "PATCH",
      data: {
        title,
        ...(subtitle === "" ? {} : {subtitle}),
        ...(select === "" ? {} : {type: select}),
      } as unknown as Partial<Album>,
    };
    await fetchDataUsingAxios(`${PageRouter.Albums}/${data.id}`, config);
    revalidate();
    setIsSuccess(true);
  };

  const toggleLoadingClass = loading ? "loading" : "";

  const errorElement = errorData.show ? (
    <ErrorAlert onClick={hideError} message={errorData.message} />
  ) : null;

  const successElement = isSuccess ? (
    <SuccessAlert
      text="Udało się zmienić dane"
      hideAfterMs={2500}
      hideMethod={hideSuccess}
    />
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
            value={inputsValues[InputName.title]}
            name={InputName.title}
            onChange={handleInputChange}
          />
          <InputLabel
            labelName="Podtytuł:"
            value={inputsValues[InputName.subtitle]}
            name={InputName.subtitle}
            onChange={handleInputChange}
          />
          <div className="mb-8 flex w-full justify-center">
            <GalleryTypeSelect
              name={InputName.select}
              onChange={handleInputChange}
              value={inputsValues[InputName.select]}
            />
          </div>
        </div>
        <Btn className={`btn-wide btn ${toggleLoadingClass}`}>Zapisz</Btn>
        {errorElement}
        {successElement}
      </form>
    </>
  );
};
