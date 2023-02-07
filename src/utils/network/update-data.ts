import { HttpRequest } from "@utils/network/http-request";
import { checkAuth } from "@utils/network/check-auth";

export const UpdateData = async (path: string, body: unknown) => {
  try {
    await checkAuth();
    await HttpRequest.patch(path, body);
  } catch (e) {
    console.log((e as Error).message);
  }
  return true;
};
