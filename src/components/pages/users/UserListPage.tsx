import {useLoaderData} from "react-router-dom";
import {UsersResponse} from "@backendTypes";
import {MainContainer} from "@components/ui/MainContainer";


export const UserListPage = ()=>{
    const data = useLoaderData() as UsersResponse[];
    return <MainContainer>

        {data.map(({id,email})=> <p>{id}, {email}</p>)}
    </MainContainer>
}