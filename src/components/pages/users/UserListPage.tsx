import { useLoaderData } from "react-router-dom";
import { UsersResponse } from "@backendTypes";
import { MainContainer } from "@components/ui/MainContainer";
import { Header } from "@components/ui/Header";
import { Divider } from "@components/ui/Divider";
import { Modal } from "@components/ui/Modal/Modal";
import { RegisterAdministrator } from "@components/RegisterAdministrator";
import { UserTable } from "@components/user/UserTable/UserTable";
import { Btn } from "@components/ui/Btn";
import { useModal } from "@hooks/useModal";

export const UserListPage = () => {
  const data = useLoaderData() as UsersResponse[];
  const { showModal, hideModal, displayModal } = useModal();
  return (
    <MainContainer>
      <Header title="Zarządzaj Admistratorami" />
      <Divider />
      <Btn className="btn-wide btn" onClick={displayModal}>
        Dodaj Administratora
      </Btn>
      <Modal
        boxModalClasses="w-2/5"
        showModal={showModal}
        hideModal={hideModal}
      >
        <RegisterAdministrator  hideModal={hideModal}/>
      </Modal>
      <Divider />
      <h2 className="mb-2 p-2 text-2xl uppercase">
        Lista wszytkich administratorów :
      </h2>
      <UserTable users={data} />
    </MainContainer>
  );
};
