import React, { useState } from "react";
import { Album } from "@backendTypes";
import {ChangeImageCard} from "@components/gallery/ChangeImageCard";
import {Divider} from "@components/ui/Divider";
const { VITE_API_URL } = import.meta.env;

interface Props {
  data: Album;
}

export const ChangeImageModalBody = ({ data }: Props) => {
  const { backgroundImage, images, title } = data;
    const [bgcImg , setBgcImg] = useState(backgroundImage)
  return (
    <div className="flex w-full flex-col items-center justify-center p-4">
      <h2 className='text-3xl p-2'>Ustaw tło albumu: <span className='font-bold'>"{title}"</span></h2>
      <h3 className='text-2xl p-2' >Aktualne tło:</h3>

      <img
        src={`${VITE_API_URL}/${backgroundImage}`}
        alt={`${bgcImg}`}
        className='object-cover rounded-box shadow-lg  w-1/3'
      />
        <Divider/>
      <div className="rounded-box mt-4 flex w-full flex-wrap space-y-4 p-4 justify-around  mt-6">
        {images.map((img) => (
          <ChangeImageCard src={`${VITE_API_URL}/${img.url}`} key={img.id} image={img} albumId={data.id} setBgcImg={setBgcImg}/>
        ))}
      </div>
    </div>
  );
};
