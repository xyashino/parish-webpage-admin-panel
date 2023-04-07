import { AxiosBase } from "@utils/network/axios-base";
import { checkAuth } from "@utils/network/check-auth";
import { redirect } from "react-router-dom";
import { PageRouter } from "@enums/page-router.enum";
import {createRoot} from "react-dom/client";
import {Loader} from "@components/ui/Loader";

const loaderElement = document.getElementById("loader");
const rootElement = createRoot(loaderElement as HTMLElement);



export const getDataFrom = async (path: string) => {
  const data = await checkAuth();

  if (data) {
    rootElement.render(<Loader/>);
    try {
      const response = await AxiosBase.get(`${path}`);
      rootElement.render(null);
      return response.data;
    } catch (e) {
      rootElement.render(null);
      return null;
    }
  }
  return redirect(PageRouter.Login);
};
