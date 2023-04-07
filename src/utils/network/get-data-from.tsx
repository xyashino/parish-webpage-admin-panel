import { AxiosBase } from "@utils/network/axios-base";
import { checkAuth } from "@utils/network/check-auth";
import { redirect } from "react-router-dom";
import { PageRouter } from "@enums/page-router.enum";
import {Root} from "react-dom/client";
import {Loader} from "@components/ui/Loader";



export const getDataFrom = async (path: string, root:Root) => {
  const data = await checkAuth();

  if (data) {
    root.render(<Loader/>);
    try {
      const response = await AxiosBase.get(`${path}`);
      root.render(null);
      return response.data;
    } catch (e) {
      root.render(null);
      return null;
    }
  }
  return redirect(PageRouter.Login);
};
