import React from "react";
import { MainContainer } from "@components/ui/MainContainer";
import { Header } from "@components/ui/Header";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Btn } from "@components/ui/Btn";
import { Divider } from "@components/ui/Divider";
import { AxiosBase } from "@utils/network/axios-base";
import { PageRouter } from "@enums/page-router.enum";
import { UserChangeEmail } from "@components/user/UserChangeEmail";
import { UserChangePassword } from "@components/user/UserChangePassword";
import { UsersResponse } from "@backendTypes";
import { useCustomConfirmAlert } from "@hooks/useCustomConfirmAlert";
import { UserInfo } from "@components/user/UserInfo";
import { CustomConfirmAlert } from "@components/alerts/CustomConfirmAlert";
export const UserCurrentPage = () => {
  const navigate = useNavigate();
  const data = useLoaderData() as UsersResponse;
  const { alertData, configureAlert } = useCustomConfirmAlert();

  const logoutUser = async () => {
    await AxiosBase.get("/auth/logout");
    navigate(PageRouter.Login);
  };

  const handleLogout = () => {
    configureAlert("Czy na pewno chcesz się wylogwać? ", logoutUser);
  };

  return (
    <MainContainer>
      <Header title="Panel użytkownika" />
      <UserInfo id={data.id} email={data.email} />
      <Divider />
      <UserChangeEmail />
      <Divider />
      <UserChangePassword />
      <Divider />
      <Btn className="btn-wide btn mb-8" onClick={handleLogout}>
        Wyloguj
      </Btn>
      {alertData.isVisible ? (
        <CustomConfirmAlert confirmConfig={alertData.config} className="w-4/5" />
      ) : null}
    </MainContainer>
  );
};
