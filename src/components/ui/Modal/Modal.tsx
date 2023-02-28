import { createPortal } from "react-dom";
import { PropsWithChildren } from "react";
import { ModalBackGround } from "@components/ui/Modal/ModalBackground";
import { ModalBox } from "@components/ui/Modal/ModalBox";

interface Props extends PropsWithChildren {
  boxModalClasses?: string;
  hideModal: (e: any) => void;
  showModal: boolean;
}

export const Modal = ({
  children,
  boxModalClasses,
  hideModal,
  showModal,
}: Props) => {
  const bodyElement = document.querySelector("body");
  if (!bodyElement) return null;

  const modal = (
    <ModalBackGround hideModal={hideModal}>
      <ModalBox hideModal={hideModal} boxModalClasses={boxModalClasses}>
        {children}
      </ModalBox>
    </ModalBackGround>
  );

  return <>{showModal ? createPortal(modal, bodyElement) : null}</>;
};
