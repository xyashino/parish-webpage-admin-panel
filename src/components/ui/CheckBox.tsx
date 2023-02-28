import React, {ChangeEvent} from "react";

interface Props {
    text:string;
    toggleMethod: (active:boolean) => void
}

export const CheckBox = ({text, toggleMethod}:Props) => {
    const handleCheckbox = (e:ChangeEvent<HTMLInputElement>)=>{
        toggleMethod(e.target.checked);
    }
  return (
    <label className="label cursor-pointer">
      <span className="label-text mx-4 ">{text}</span>
      <input type="checkbox" className="checkbox" onChange={handleCheckbox}/>
    </label>
  );
};
