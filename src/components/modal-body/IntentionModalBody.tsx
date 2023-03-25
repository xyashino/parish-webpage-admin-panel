import React, {SyntheticEvent, useRef, useState} from "react";
import { Btn } from "@components/ui/Btn";
import {
  EditorComponentRef,
  RichTextEditor,
} from "@components/Editor/RichTextEditor";

interface Props {
  addField: (hour: string , value:string) => void;
  hideModal: (e:SyntheticEvent) => void;
  title:string;
  baseValue?: {defaultEditorValue: string; hour:string}
  btnValue:string
}
const formatHour = (value: string): string => {
    if (value.length === 3 && !value.includes(":")) {
        return value.slice(0, 2) + ":" + value.slice(2);
    }
    return value;
};

export const IntentionModalBody = ({ addField, hideModal,title,baseValue ,btnValue}: Props) => {
  const editorRef = useRef<EditorComponentRef>(null);
  const [hour,setHour] = useState(baseValue?.hour ?? '')
  const handleClick = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { current } = editorRef;
    if (!current) return;
    addField(hour,current.getRawHtml());
    hideModal(e);
  };

  const changeHour = (e:SyntheticEvent) => {
      const {value} = e.target as HTMLInputElement;
      if(value.length > 5) return;
      setHour(formatHour(value));
  }

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h2 className="mx-4 text-3xl font-bold uppercase">{title}</h2>
            <label className='bg-accent p-8 rounded-box m-4 w-4/5 flex items-center'>
                <p className='text-xl uppercase font-bold text-accent-content mx-4'  >Godzina:</p>
                <input type="text" className='input input-md' value={hour} onChange={changeHour} placeholder='HH:MM' autoComplete='hour'/>
            </label>
      <div className="w-4/5 bg-accent p-8 rounded-box flex items-center justify-center">
        <RichTextEditor ref={editorRef} defaultValue={baseValue?.defaultEditorValue} />
      </div>
      <Btn className="btn-primary btn-wide btn m-4" onClick={(e)=>handleClick(e)}>
          {btnValue}
      </Btn>
    </div>
  );
};
