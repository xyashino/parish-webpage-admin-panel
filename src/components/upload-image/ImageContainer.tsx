import React, {
  Dispatch,
  SetStateAction,
} from "react";
import { Image } from "@components/upload-image/Image";

interface Props {
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
}

export const ImageContainer = ({ images ,setImages}: Props) => {
  return (
    <div className="flex w-full flex-wrap justify-around space-y-10 bg-base-100 w-full px-2 py-8 rounded-box">
      {images.length !== 0 ? images.map((image, index) => (
        <Image key={index} data={image} index={index} setImages={setImages} />
      )) : <p>Brak zdjęć</p>}
    </div>
  );
};
