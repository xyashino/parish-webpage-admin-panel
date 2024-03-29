import React, { SyntheticEvent, useRef } from "react";
import { Btn } from "@components/ui/Btn";
import {EditorComponentRef, RichTextEditor} from "@components/Editor/RichTextEditor";

interface Props {
  addField: (e: string) => void;
  hideModal: (e: SyntheticEvent) => void;
  body:string
}

export const EditAnnouncementModalBody = ({ addField, hideModal,body }: Props) => {
  const editorRef = useRef<EditorComponentRef>(null);
  const handleClick = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { current } = editorRef;
    if (!current) return;
    addField(current.getRawHtml());
    hideModal(e);
  };
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h2 className="mx-4 text-3xl font-bold uppercase">Edytuj Ogłoszenie :</h2>
      <div className='w-4/5'>
        <RichTextEditor ref={editorRef} defaultValue={body}/>
      </div>
      <Btn className="btn-wide btn" onClick={handleClick}>
        Zapisz
      </Btn>
    </div>
  );
};
