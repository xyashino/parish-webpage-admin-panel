import React, { HTMLAttributes } from "react";
import { PageRouter } from "@enums/page-router.enum";
import { AlbumType } from "@backendTypes";
import { useDataFrom } from "@hooks/useDataFrom";

interface Props extends HTMLAttributes<HTMLSelectElement> {
  name: string;
}

export const GalleryTypeSelect = ({ ...props }: Props) => {
  const { data, loading } = useDataFrom<AlbumType[]>(PageRouter.AlbumTypes);

  const loadingElement = (
    <select className="select  select-md w-full" {...props}>
      <option disabled selected>
        Wczytywanie
      </option>
    </select>
  );

  const selectElement = (
    <select
      className="select select-md w-full font-medium uppercase"
      {...props}
    >
      <option selected>Brak</option>
      {!data
        ? null
        : data.map((el) => (
            <option value={el.id} key={el.id}>
              {el.name}
            </option>
          ))}
    </select>
  );

  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text uppercase">Wybierz grupe</span>
      </label>
      {loading ? loadingElement : selectElement}
    </div>
  );
};
