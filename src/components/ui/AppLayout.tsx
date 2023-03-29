import { AppMenu } from "@components/app-menu/AppMenu";
import { Outlet } from "react-router-dom";
import {Footer} from "@components/ui/Footer";

export const AppLayout = () => {
  return (
      <div className='flex flex-col h-screen'>
          <div className="flex w-screen bg-base-300 grow">
              <AppMenu />
              <main className="flex items-start justify-center overflow-y-scroll w-5/6">
                  <Outlet />
              </main>
          </div>
          <Footer/>
      </div>
);
};
