import { useState } from "react";
import { MainContainer } from "@components/ui/MainCointaner";
import { Header } from "@components/ui/Header";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Btn } from "@components/ui/Btn";
import { Divider } from "@components/ui/Divider";
import { AxiosBase } from "@utils/network/axios-base";
import { PageRouter } from "@enums/page-router.enum";
import { ConfirmAlert } from "@components/alerts/ConfirmAlert";
import { ConfirmConfig } from "@frontendTypes/confirm-config.inteface";
import { UserChangeEmail } from "@components/User/UserChangeEmail";
import { UserChangePassword } from "@components/User/UserChangePassword";
import { UsersResponse } from "@backendTypes";
import { UserInfo } from "@components/User/UserInfo";
export const CurrentUserPage = () => {
  const navigate = useNavigate();
  const data = useLoaderData() as UsersResponse;
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState<null | ConfirmConfig>(
    null
  );

  const logoutUser = async () => {
    setShowConfirmAlert(false);
    await HttpRequest.get("/auth/logout");
    navigate(PageRouter.Login);
  };

  const handleLogout = () => {
    setConfirmConfig({
      infoText: "Czy na pewno chcesz się wylogwać>",
      denyClicked: () => setShowConfirmAlert(false),
      confirmClicked: logoutUser,
    });
    setShowConfirmAlert(true);
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
      {showConfirmAlert ? (
        <ConfirmAlert config={confirmConfig} className="w-4/5" />
      ) : null}
      <Btn className="btn-wide btn" onClick={handleLogout}>
        Wyloguj
      </Btn>
    </MainContainer>
  );
};
