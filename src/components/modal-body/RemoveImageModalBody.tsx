import { Album } from "@backendTypes";
import { useState } from "react";
import { RemoveImageCard } from "@components/gallery/RemoveImageCard";
interface Props {
  data: Album;
}

export const RemoveImageModalBody = ({ data }: Props) => {
  const [images, setImages] = useState(data.images);
  return (
    <div className="flex w-full flex-col items-center justify-center p-4">
      <h2 className="text-3xl uppercase">
        {" "}
        <span className="font-bold text-error">UWAGA !!!</span> tutaj USUWASZ{" "}
        <span className="font-bold text-error">TRWALE </span> zdjęcia z albumu "
        {data?.title}"
      </h2>
      <div className="rounded-box mt-4 flex w-full flex-wrap justify-around space-y-4 space-y-5 p-4">
        {images.map((img, i) => (
          <RemoveImageCard
            setImages={setImages}
            image={img}
            index={i}
            key={img.id}
          />
        ))}
      </div>
    </div>
  );
};
