import React from "react";
import { MainContainer } from "@components/ui/MainCointaner";
import { Header } from "@components/ui/Header";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Btn } from "@components/ui/Btn";
import { Divider } from "@components/ui/Divider";
import { AxiosBase } from "@utils/network/axios-base";
import { PageRouter } from "@enums/page-router.enum";
import { UserChangeEmail } from "@components/User/UserChangeEmail";
import { UserChangePassword } from "@components/User/UserChangePassword";
import { UsersResponse } from "@backendTypes";
import {useConfirmAlert} from "@hooks/useConfirmAlert";
import {UserInfo} from "@components/User/UserInfo";
import {ConfirmAlert} from "@components/alerts/ConfirmAlert";
export const CurrentUserPage = () => {
    const navigate = useNavigate();
    const data = useLoaderData() as UsersResponse;
    const {alertData,setConfig} = useConfirmAlert();


  const logoutUser = async () => {
    await AxiosBase.get("/auth/logout");
    navigate(PageRouter.Login);
  };

  const handleLogout = () => {
      setConfig("Czy na pewno chcesz się wylogwać? ",
      logoutUser,
    );
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
      <Btn className="btn-wide btn" onClick={handleLogout}>
        Wyloguj
      </Btn>
        {
            alertData.show ? <ConfirmAlert config={alertData.config} className='w-4/5'/> : null
        }
    </MainContainer>
  );
};
