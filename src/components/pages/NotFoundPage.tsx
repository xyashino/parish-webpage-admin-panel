import React from "react";

import { Link } from "react-router-dom";
import { PageRouter } from "@enums/page-router.enum";

export const NotFoundPage = () => {
  return (
    <section className="flex h-screen w-full flex-col items-center justify-center bg-primary">
      <h1 className="text-9xl font-extrabold tracking-widest text-white">
        404
      </h1>
      <div className="absolute rotate-12 rounded bg-secondary px-2 text-sm text-secondary-content">
        Page Not Found
      </div>
      <button className="mt-5">
        <Link
          to={PageRouter.Home}
          className="group relative inline-block text-sm font-medium text-primary-content focus:outline-none focus:ring active:text-orange-500"
        >
          <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-primary-content  transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>
          <span className="relative block border border-current bg-primary px-8 py-3 uppercase">
            Strona Główna
          </span>
        </Link>
      </button>
    </section>
  );
};
