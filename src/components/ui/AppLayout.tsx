import { AppMenu } from "@components/appMenu/AppMenu";
import { Outlet } from "react-router-dom";
import {Footer} from "@components/ui/Footer";

export const AppLayout = () => {
  return (
      <div className='min-h-screen flex flex-col'>
          <div className="flex w-screen bg-base-300 grow">
              <AppMenu />
              <main className="flex items-start justify-center overflow-y-scroll  w-5/6">
                  <Outlet />
              </main>
          </div>
          <Footer/>
      </div>


);
};
