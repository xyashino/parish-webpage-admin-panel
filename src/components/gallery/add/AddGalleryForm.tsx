import React, {
  PropsWithChildren,
  SyntheticEvent,
} from "react";
import { Btn } from "@components/ui/Btn";
import { useAxios } from "@hooks/useAxios";
import { AxiosRequestConfig } from "axios";
import { CreateAlbumRequestInterface } from "@backendTypes";
import { PageRouter } from "@enums/page-router.enum";
import { useRevalidator } from "react-router-dom";
import { CustomErrorAlert } from "@components/alerts/CustomErrorAlert";
interface Props extends PropsWithChildren {
  inputs: { title: string; subtitle: string; type: string };
  hideModal: (e?: any) => void;
}

export const AddGalleryForm = ({ inputs, children, hideModal }: Props) => {
  const {
    loading,
    err: { data, showError, hideError },
    fetchDataUsingAxios,
  } = useAxios();
  const { revalidate } = useRevalidator();

  const runAfterSuccess = () => {
    hideModal();
    revalidate();
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { title, subtitle, type } = inputs;
    if (title.length === 0) {
      showError("Musisz podać tytuł !!!");
      return;
    }
    const config: AxiosRequestConfig = {
      method: "POST",
      data: {
        title,
        ...(type.length === 0 ? {} : { type }),
        ...(subtitle.length === 0 ? {} : { subtitle }),
      } as CreateAlbumRequestInterface,
    };
    await fetchDataUsingAxios(`${PageRouter.Albums}`, config, runAfterSuccess);
  };
  const toggleLoadingClass = loading ? "loading" : "";

  const errorElement = data.show ? (
    <CustomErrorAlert handleClick={hideError} errorMessage={data.message} />
  ) : null;

  return (
    <form className="flex flex-wrap justify-around" onSubmit={handleSubmit}>
      {children}
      <div className="mx-10 flex w-full justify-center border-t-2 p-4 mt-8">
        <Btn className={`btn-wide btn ${toggleLoadingClass}`}>Dodaj Album</Btn>
      </div>
      {errorElement}
    </form>
  );
};
