import React, { Dispatch, SetStateAction } from "react";
import { Btn } from "@components/ui/Btn";

const MB = 1000000;

interface Props {
  data: File;
  index: number;
  setImages: Dispatch<SetStateAction<File[]>>;
}

export const Image = ({ data, index, setImages }: Props) => {
  const { name, size, type } = data;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setImages((prevState) => {
      const newState = [...prevState];
      newState.splice(index, 1);
      return newState;
    });
  };

  return (
    <div className="card glass w-96 overflow-hidden">
      <figure>
        <img src={URL.createObjectURL(data)} alt={`Selected Image ${index}`} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p className="text-left">
          <span className="font-bold">Size:</span> {(size / MB).toFixed(3)} MB
        </p>
        <p className="text-left">
          <span className="font-bold">Type:</span> {type}
        </p>
        <div className="card-actions justify-end">
          <Btn onClick={handleClick} aria-label={`Remove image ${index}`}>
            Usuń
          </Btn>
        </div>
      </div>
    </div>
  );
};
