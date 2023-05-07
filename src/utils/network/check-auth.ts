import { redirect } from "react-router-dom";
import { PageRouter } from "@enums/page-router.enum";
import { AxiosBase } from "@utils/network/axios-base";
import {RequestPath} from "@enums/request-path.enum";

export const checkAuth = async () => {
  try {
    await AxiosBase.get(RequestPath.CurrentUser);
    return true;
  } catch (e) {
    return redirect(PageRouter.Login);
  }
};
