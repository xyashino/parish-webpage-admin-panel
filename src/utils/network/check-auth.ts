import { redirect } from "react-router-dom";
import { PageRouter } from "@enums/page-router.enum";
import { HttpRequest } from "@utils/network/http-request";

export const checkAuth = async () => {
  try {
    await HttpRequest.get("users/current");
    return true;
  } catch (e) {
    return redirect(PageRouter.Login);
  }
};
