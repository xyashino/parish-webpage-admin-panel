import React, { HTMLAttributes } from "react";
import { PageRouter } from "@enums/page-router.enum";
import { AlbumType } from "@backendTypes";
import { useDataFrom } from "@hooks/useDataFrom";

interface Props extends HTMLAttributes<HTMLSelectElement> {
  name: string;
}

export const GalleryTypeSelect = ({ ...props }: Props) => {
  const { data, loading } = useDataFrom<AlbumType[]>(PageRouter.AlbumTypes);

  if (loading) {
    return (
      <select className="select  select-sm w-full" {...props}>
        <option disabled selected>
          Wczytywanie
        </option>
      </select>
    );
  }
  return (
    <select className="select  select-sm w-full" {...props}>
      <option disabled selected>
        Wybierz grupe
      </option>
      <option value="">Brak</option>
      {!data
        ? null
        : data.map((el) => (
            <option value={el.id} key={el.id}>
              {el.name}
            </option>
          ))}
    </select>
  );
};
