import { AppMenu } from "@components/AppMenu/AppMenu";
import { Outlet } from "react-router-dom";
import {Footer} from "@components/ui/Footer";

export const AppLayout = () => {
  return (
      <div className='min-h-screen flex flex-col'>
          <div className="flex w-screen bg-base-300 grow">
              <AppMenu />
              <main className="flex grow items-start justify-center  overflow-y-scroll">
                  <Outlet />
              </main>
          </div>
          <Footer/>
      </div>


);
};
