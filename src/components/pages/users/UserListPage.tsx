import { useLoaderData } from "react-router-dom";
import { UsersResponse } from "@backendTypes";
import { MainContainer } from "@components/ui/MainContainer";
import { Header } from "@components/ui/Header";
import { Divider } from "@components/ui/Divider";
import { Modal } from "@components/ui/Modal/Modal";
import { RegisterAdministrator } from "@components/RegisterAdministrator";
import { Btn } from "@components/ui/Btn";
import { useModal } from "@hooks/useModal";
import { BorderContainer } from "@components/ui/BorderContainer";
import { UserTable } from "@components/table/user/UserTable";

export const UserListPage = () => {
  const data = useLoaderData() as UsersResponse[];
  const { showModal, hideModal, displayModal } = useModal();
  return (
    <>
      <MainContainer>
        <Header title="Zarządzaj Admistratorami" />
        <BorderContainer>
          <Btn className="btn-wide btn m-4" onClick={displayModal}>
            Dodaj Administratora
          </Btn>
        </BorderContainer>
        <Divider />
        <h2 className="mb-2 p-2 text-2xl uppercase">
          Lista wszytkich administratorów :
        </h2>
        <UserTable users={data} />
      </MainContainer>
      <Modal
        boxModalClasses="w-2/5"
        showModal={showModal}
        hideModal={hideModal}
      >
        <RegisterAdministrator hideModal={hideModal} />
      </Modal>
    </>
  );
};
