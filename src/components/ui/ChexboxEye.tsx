import React, { SyntheticEvent, useLayoutEffect, useState} from "react";
import {SlashEye} from "@icons/SlashEye";
import {Eye} from "@icons/Eye";

interface Props  {
    onToggleActive: (active:boolean) => void;
}

export const CheckBoxEye = ({ onToggleActive}:Props) => {
    const [isCheck,setIsCheck]= useState(false);
    useLayoutEffect(()=>{
        onToggleActive(isCheck)
    },[isCheck])
    const handleClick=(e:SyntheticEvent)=> {
        e.preventDefault();
        setIsCheck(prevState => !prevState);
    }
    const styles = 'text-3xl m-2 select-none self-end absolute bottom-1/3 translate-y-1/2';
  return (
    <i>
        {isCheck ?  <Eye onClick={handleClick} className={styles} /> : <SlashEye onClick={handleClick} className={styles}/>}
    </i>
  );
};
