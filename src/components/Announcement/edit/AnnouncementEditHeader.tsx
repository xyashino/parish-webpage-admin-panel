import React, { ChangeEvent, useContext, useState } from "react";
import { AnnouncementContext } from "@context/AnnouncementContext";

interface Props {
  title: string;
  subtitle: string;
}

export const AnnouncementEditHeader = ({ subtitle, title }: Props) => {
  const [data, setData] = useState({ title, subtitle });
  const { setAnnouncements } = useContext(AnnouncementContext);

  const updateData = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const {
      target: { value, name },
    } = e;

    if (name === "title") {
      setData((prevState) => {
        prevState.title = value;
        return { ...prevState };
      });
      return;
    }
    setData((prevState) => {
      prevState.subtitle = value;
      return { ...prevState };
    });
  };

  const updateContextData = () => {
    setAnnouncements((prevState) => {
      const { title, subtitle } = data;
      prevState.title = title;
      prevState.subtitle = subtitle;
      return { ...prevState };
    });
  };

  return (
    <header className="prose flex flex flex w-full flex-col items-center justify-center bg-primary p-4 font-bold uppercase text-base-100">
      <label className="flex w-3/4 grow items-center space-x-4 border-b-2 p-2 ">
        <span className="text-2xl">Główny tytuł :</span>
        <input
          type="text"
          name="title"
          className="input grow text-black"
          value={data.title}
          onChange={(e) => updateData(e)}
          onBlur={updateContextData}
        />
      </label>

      <label className="flex w-3/4 items-center space-x-4 border-b-2 p-2">
        <span className="text-xl">Podtytuł :</span>
        <input
          type="text"
          name="subtitle"
          className="input grow text-black"
          value={data.subtitle}
          onBlur={updateContextData}
          onChange={(e) => updateData(e)}
        />
      </label>
    </header>
  );
};
