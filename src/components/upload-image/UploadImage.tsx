import React, { FormEvent, SyntheticEvent, useState } from "react";
import { Btn } from "@components/ui/Btn";
import { DragAndDropFile } from "@components/upload-image/DragAndDropFile";
import { ImageContainer } from "@components/upload-image/ImageContainer";
import { ProgressBar } from "@components/ui/ProgressBar";
import { CustomErrorAlert } from "@components/alerts/CustomErrorAlert";
import { AxiosBase } from "@utils/network/axios-base";
import { useCustomErrorAlert } from "@hooks/useCustomErrorAlert";
import { isAxiosError } from "axios";

const config = {
  method: "POST",
  headers: {
    "content-type": "multipart/form-data",
  },
};
const removeFirstArrElement = <T extends {}>(arr: T[]): T[] => {
  const stateCopy = [...arr];
  stateCopy.shift();
  return stateCopy;
};
export const UploadImage = ({ id }: { id: string }) => {
  const [images, setImages] = useState<File[]>([]);
  const { hideError, showError, errorData } = useCustomErrorAlert();
  const [loading, setLoading] = useState({
    show: false,
    value: 0,
  });
  const uploadFile = async (image: File) => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      await AxiosBase.post(`uploads/${id}/image`, formData, config);
    } catch (error) {
      let message = "Unknown Error";
      if (isAxiosError(error)) {
        message =
          error.response?.data.message ??
          error.response?.data.error ??
          error.message;
      }
      showError(message);
      return true;
    }
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    hideError();
    const { length } = images;
    setLoading({ show: true, value: 0 });
    for (const [index, image] of images.entries()) {
      const error = await uploadFile(image);
      if (error) break;
      const value = Number((((index + 1) / length) * 100).toFixed(0));
      setImages((prevState) => removeFirstArrElement(prevState));
      setLoading({ show: true, value });
    }
    setTimeout(() => setLoading({ show: false, value: 0 }), 1500);
  };

  const clearImages = (e: SyntheticEvent) => {
    e.preventDefault();
    setImages([]);
  };

  const progress = loading.show ? (
    <div className="flex w-full justify-center">
      <ProgressBar value={loading.value} description />
    </div>
  ) : null;
  const errorElement = errorData.show ? (
    <CustomErrorAlert
      handleClick={hideError}
      errorMessage={errorData.message}
      className="w-5/6"
    />
  ) : null;

  const toggleDisableClass = images.length !== 0 ? "" : "btn-disabled";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-wrap justify-center"
    >
      <div className="flex w-full flex-wrap items-center justify-around space-y-4">
        <Btn className={`btn-wide btn ${toggleDisableClass}`}>Upload</Btn>
        <p className="font-bold uppercase">Licznik zdjęć : {images.length}</p>
        <Btn className="btn-wide btn" onClick={clearImages}>
          Wyczyść
        </Btn>
        {progress}
        {errorElement}
      </div>
      <DragAndDropFile setImages={setImages} />
      <ImageContainer images={images} setImages={setImages} />
    </form>
  );
};
