import {Album} from "@backendTypes";
import {UploadImage} from "@components/upload-image/UploadImage";

interface Props {
    id:Album['id']
}

export const UploadImageModalBody=({id}:Props)=>{
    return <div className='flex flex-col justify-center items-center w-full p-4'>
        <UploadImage id={id}/>
    </div>
}