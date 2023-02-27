import {UsersResponse} from "@backendTypes";
import {UserTableRow} from "@components/User/UserTable/UserTableRow";

interface Props {
    users:UsersResponse[];
}

export const UserTable = ({users}:Props)=>{
    return <table className='table w-full border-2'>
        <thead >
           <tr className='bg-primary'>
               <th>ID</th>
               <th>email</th>
               <th></th>
           </tr>
        </thead>
        <tbody>
        {users.map(({id,email})=> <UserTableRow id={id} email={email} key={id}/>)}
        </tbody>
    </table>
}