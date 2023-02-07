import { AppMenu } from "@components/AppMenu/AppMenu";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <div className="flex w-screen bg-base-300">
      <AppMenu></AppMenu>
      <main className="flex flex-grow items-start justify-center  overflow-y-scroll">
        <Outlet />
      </main>
    </div>
  );
};
