import React from "react";
import { Link } from "react-router-dom";
import { PageRouter } from "@enums/page-router.enum";
import { ErrorLogo } from "@icons/ErrorLogo";

export const ErrorPage = () => {
  return (
    <section className="flex h-full w-full grow items-center bg-base-200">
      <div className="flex h-full w-full flex-col items-center justify-center  px-5 pb-16 text-center">
        <ErrorLogo />
        <p className="m-4 text-2xl uppercase italic">
          Przepraszamy ta funkcja nie jest aktualnie dostępna spróbuj ponownie
          poźniej.
        </p>
        <Link
          to={PageRouter.Main}
          className="btn-primary btn m-8 rounded  p-2 px-8 py-3 font-semibold  uppercase"
        >
          Strona główna
        </Link>
      </div>
    </section>
  );
};
