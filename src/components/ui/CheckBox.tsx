import React, {ChangeEvent} from "react";

interface Props {
    text:string;
    onToggleActive: (active:boolean) => void
}

export const CheckBox = ({text, onToggleActive}:Props) => {
    const handleCheckbox = (e:ChangeEvent<HTMLInputElement>)=>{
        onToggleActive(e.target.checked);
    }
  return (
    <label className="label cursor-pointer">
      <span className="label-text mx-4 ">{text}</span>
      <input type="checkbox" className="checkbox" onChange={handleCheckbox}/>
    </label>
  );
};
