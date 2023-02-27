import {useLoaderData} from "react-router-dom";
import {UsersResponse} from "@backendTypes";
import {MainContainer} from "@components/ui/MainContainer";
import {Header} from "@components/ui/Header";
import {Divider} from "@components/ui/Divider";
import {Modal} from "@components/ui/Modal/Modal";
import {RegisterAdministrator} from "@components/RegisterAdministrator";
import {UserTable} from "@components/User/UserTable/UserTable";


export const UserListPage = ()=>{
    const data = useLoaderData() as UsersResponse[];
    return <MainContainer>
        <Header title='Zarządzaj Admistratorami'/>
        <Divider/>
        <Modal btnValue="Dodaj Administratora" boxModalClasses='w-2/5'>
            <RegisterAdministrator/>
        </Modal>
        <Divider/>
        <h2 className='text-2xl p-2 mb-2 uppercase'>Lista wszytkich administratorów :</h2>
        <UserTable users={data}/>
    </MainContainer>
}