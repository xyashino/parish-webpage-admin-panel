import {UsersResponse} from "@backendTypes";
import {UserTableRow} from "@components/user/UserTable/UserTableRow";
import {BaseTable} from "@components/ui/Table/BaseTable";

interface Props {
    users:UsersResponse[];
}

export const UserTable = ({users}:Props)=>{
    const thColumns = ['id','e-mail']
    return <BaseTable thColumns={thColumns}>
        {users.map(({id,email},i)=> <UserTableRow id={id} email={email} key={id} index={i}/>)}
    </BaseTable>
}