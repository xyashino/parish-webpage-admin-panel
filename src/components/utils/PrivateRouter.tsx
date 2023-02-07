import { Navigate, Outlet, redirect } from "react-router-dom";
import { PageRouter } from "@enums/page-router.enum";
export const PrivateRouter = () => {
  let auth = true;

  if (!auth) {
    return redirect("/login");
  }

  return <>{auth ? <Outlet /> : <Navigate to={PageRouter.Login} />}</>;
};
