import React, { FormEvent, useContext } from "react";
import { AnnouncementContext } from "@context/AnnouncementContext";
import { SelectStatus } from "@components/SelectStatus";

export const AnnouncementEditHeader = () => {
  const { restAnnouncement, setRestAnnouncement } =
    useContext(AnnouncementContext);

  const updateData = (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.preventDefault();
    const { value, name } = e.target as HTMLInputElement;
    setRestAnnouncement((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <header className="prose flex flex flex w-full flex-col items-center justify-center bg-primary p-4 font-bold uppercase text-base-100">
      <label className="flex w-3/4 grow items-center space-x-4 border-b-2 p-2 ">
        <span className="text-2xl">Główny tytuł :</span>
        <input
          type="text"
          name="title"
          className="input grow text-black"
          value={restAnnouncement.title}
          onChange={updateData}
        />
      </label>
      <label className="flex w-3/4 grow items-center space-x-4 border-b-2 p-2 ">
        <span className="text-2xl">Podtytuł :</span>
        <input
          type="text"
          className="input grow text-black"
          name="subtitle"
          value={restAnnouncement.subtitle}
          onChange={updateData}
        />
      </label>
      <label className="flex w-3/4 grow items-center justify-center space-x-4 border-b-2 p-2">
        <span className="mr-8 text-2xl">Status :</span>
        <SelectStatus
          name="status"
          defaultValue={restAnnouncement.status ?? ""}
          onChange={updateData}
          value={restAnnouncement.status ?? ""}
        />
      </label>
    </header>
  );
};
