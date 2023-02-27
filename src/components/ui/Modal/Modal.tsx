import { createPortal } from "react-dom";
import { PropsWithChildren, useState } from "react";
import { ModalBackGround } from "@components/ui/Modal/ModalBackground";
import { ModalBox } from "@components/ui/Modal/ModalBox";
import { Btn } from "@components/ui/Btn";

interface Props extends PropsWithChildren {
  btnValue: string;
  boxModalClasses?:string;
}

export const Modal = ({ children, btnValue,boxModalClasses }: Props) => {
  const bodyElement = document.querySelector("body");
  if (!bodyElement) return null;

  const [showModal, setShowModal] = useState(false);

  const displayModal = () => setShowModal(true);
  const hideModal = () => setShowModal(false);

  const modal = (
    <ModalBackGround hideModal={hideModal}>
      <ModalBox hideModal={hideModal} boxModalClasses={boxModalClasses}>{children}</ModalBox>
    </ModalBackGround>
  );

  return (
    <>
      <Btn onClick={displayModal} className='btn btn-wide'>{btnValue}</Btn>
      {showModal ? createPortal(modal, bodyElement) : null}
    </>
  );
};
