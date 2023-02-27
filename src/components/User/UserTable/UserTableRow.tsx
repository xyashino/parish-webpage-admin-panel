import {UsersResponse} from "@backendTypes";
import {Trash} from "@icons/Trash";

interface Props {
    id:UsersResponse['id'];
    email:UsersResponse['email'];
}

export const UserTableRow = ({id,email}:Props)=>{
    const iconStyles = 'text-xl m-2 hover:scale-125';
    return <tr className='hover transition-colors cursor-pointer'>
        <td>{id}</td>
        <td>{email}</td>
        <td className='flex'>
            <Trash className={iconStyles}/>
        </td>
    </tr>
}