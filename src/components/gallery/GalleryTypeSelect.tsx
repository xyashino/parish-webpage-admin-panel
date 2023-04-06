import React, { HTMLAttributes } from "react";
import { PageRouter } from "@enums/page-router.enum";
import { AlbumType } from "@backendTypes";
import {useFetchData} from "@hooks/useFetchData";

interface Props extends HTMLAttributes<HTMLSelectElement> {
  name: string;
  url?: string;
  value?:string;
}

export const GalleryTypeSelect = ({ ...props }: Props) => {
  const { data, loading } = useFetchData<AlbumType[]>(PageRouter.AlbumTypes);
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
      <option value="">Brak</option>
      {data?.map((el) => (
        <option value={el.id} key={el.id}>
          {el.name}
        </option>
      )) || null}
    </select>
  );

  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text font-bold uppercase">Wybierz grupe: </span>
      </label>
      {loading ? loadingElement : selectElement}
    </div>
  );
};
