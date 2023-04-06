import { AxiosBase } from "@utils/network/axios-base";
import { checkAuth } from "@utils/network/check-auth";

export const UpdateData = async (path: string, body: unknown) => {
  try {
    await checkAuth();
    await AxiosBase.patch(path, body);
  } catch (e) {
    console.error((e as Error).message);
  }
  return true;
};
