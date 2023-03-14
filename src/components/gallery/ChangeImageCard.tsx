import React, { Dispatch, SetStateAction, SyntheticEvent } from "react";
import { Album, Image } from "@backendTypes";
import { useAxios } from "@hooks/useAxios";

interface Props {
  image: Image;
  albumId: Album["id"];
  src: string;
  setBgcImg: Dispatch<SetStateAction<string | undefined>>;
}

export const ChangeImageCard = ({ image, albumId, src,setBgcImg }: Props) => {
  const { url ,oldName} = image;
  const { fetchDataUsingAxios } = useAxios();
  const handleClick = async (e: SyntheticEvent) => {
    e.preventDefault();
    await fetchDataUsingAxios(`albums/${albumId}/`, {
      method: "PATCH",
      data: {
        backgroundImage: url,
      } as Album,
    });
    setBgcImg(url);
  };

  return (
    <img
      src={src}
      onClick={handleClick}
      alt={`Album img - old name: ${oldName}`}
      className="rounded-box w-96 cursor-pointer  object-cover shadow-lg transition-transform hover:scale-125"
    />
  );
};
