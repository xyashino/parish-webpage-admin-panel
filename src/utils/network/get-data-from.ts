import { HttpRequest } from "@utils/network/http-request";
import { checkAuth } from "@utils/network/check-auth";
import { redirect } from "react-router-dom";
import { PageRouter } from "@enums/page-router.enum";

export const getDataFrom = async (path: any) => {
  const data = await checkAuth();
  if (data) {
    try {
      const response = await HttpRequest.get(path);
      return response.data;
    } catch (e) {
      return null;
    }
  }
  return redirect(PageRouter.Login);
};
