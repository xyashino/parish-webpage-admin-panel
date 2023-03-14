import React, { FormEvent, useState } from "react";
import { InputLabel } from "@components/ui/InputLabel";
import { GalleryTypeSelect } from "@components/gallery/GalleryTypeSelect";
import { AddGalleryForm } from "@components/gallery/add/AddGalleryForm";

enum INPUT_NAME {
  title = "title",
  subtitle = "subtitle",
  type = "type",
}

interface Props {
  hideModal: (e?: any) => void;
}

export const AddGallery = ({ hideModal }: Props) => {
  const arrayFromEnum = Object.keys(INPUT_NAME);
  const [inputsValue, setInputsValue] = useState({
    [INPUT_NAME.title]: "",
    [INPUT_NAME.subtitle]: "",
    [INPUT_NAME.type]: "",
  });
  const handleInputChange = (
    e: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    const { value, name } = e.target as HTMLInputElement | HTMLSelectElement;
    if (arrayFromEnum.includes(name)) {
      setInputsValue((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  return (
    <div className="p-4">
      <h2 className="w-full py-4 text-center text-2xl font-medium uppercase">
        Dodaj nowy Album
      </h2>
      <AddGalleryForm inputs={inputsValue} hideModal={hideModal}>
        <div className="w-1/2">
          <InputLabel
            labelName="Tytuł albumu : "
            value={inputsValue[INPUT_NAME.title]}
            onChange={handleInputChange}
            placeholder="WYMAGANE"
            name={INPUT_NAME.title}
          />
          <InputLabel
            labelName="Podtytuł : "
            value={inputsValue[INPUT_NAME.subtitle]}
            onChange={handleInputChange}
            placeholder="OPCJONALNE"
            name={INPUT_NAME.subtitle}
          />
        </div>
        <div className="w-1/3 p-2">
          <GalleryTypeSelect
            onChange={handleInputChange}
            name={INPUT_NAME.type}
          />
        </div>
      </AddGalleryForm>
    </div>
  );
};
