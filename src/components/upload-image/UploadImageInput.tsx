import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

interface Props {
  setImages: Dispatch<SetStateAction<File[]>>;
}

export const UploadImageInput = ({ setImages }: Props) => {
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);
      setImages((prevState) => [...prevState, ...filesArray]);
    }
  };
  return (
    <input
      type="file"
      onChange={handleImageChange}
      accept="image/*"
      className="link appearance-none"
      multiple
    />
  );
};
