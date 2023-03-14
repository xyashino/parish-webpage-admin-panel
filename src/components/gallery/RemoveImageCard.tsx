import React, { Dispatch,  SetStateAction, SyntheticEvent} from "react";
import {Btn} from "@components/ui/Btn";
import {Image} from "@backendTypes";
import {useAxios} from "@hooks/useAxios";

const {VITE_GALLERY_URL} = import.meta.env;
interface Props {
    image:Image,
    index:number,
    setImages: Dispatch<SetStateAction<Image[] >>;

}

export const RemoveImageCard = ({ image,index ,setImages}: Props) => {
    const {url,oldName,id} =image;
    const {fetchDataUsingAxios} = useAxios();
    const handleClick = async (e:SyntheticEvent) => {
        e.preventDefault();
        await fetchDataUsingAxios(`albums/image/${id}`,{method:'DELETE'})
        setImages(prevState => {
            if(!prevState) return prevState
            const newState = [...prevState];
            newState.splice(index, 1);
            return newState;
        })
    };

    return (
        <div className="card w-96 glass overflow-hidden">
            <figure><img src={`${VITE_GALLERY_URL}${url}`} alt="Album Image"/></figure>
            <div className="card-body">
                <h2 className="card-title">{oldName}</h2>
                <div className="card-actions justify-end">
                    <Btn onClick={handleClick}>Usuń</Btn>
                </div>
            </div>
        </div>
    );
};
