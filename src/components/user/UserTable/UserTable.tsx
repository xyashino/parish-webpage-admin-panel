import {UsersResponse} from "@backendTypes";
import {UserTableRow} from "@components/user/UserTable/UserTableRow";

interface Props {
    users:UsersResponse[];
}

export const UserTable = ({users}:Props)=>{
    return <table className='table border-2 w-5/6'>
        <thead >
           <tr >
               <th>Lp.</th>
               <th>ID</th>
               <th>email</th>
               <th></th>
           </tr>
        </thead>
        <tbody>
        {users.map(({id,email},i)=> <UserTableRow id={id} email={email} key={id} index={i}/>)}
        </tbody>
    </table>
}