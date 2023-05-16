import { PropsWithChildren, SyntheticEvent, useRef } from "react";

interface Props extends PropsWithChildren {
  hideModal: (e: SyntheticEvent) => void;
}

export const ModalBackGround = ({ children, hideModal }: Props) => {
  const modalRef = useRef(null);
  const handleClick = (e: SyntheticEvent) => {
    if (e.target === modalRef.current) {
      hideModal(e);
    }
  };
  return (
    <div
      className="fixed inset-0 z-40  bg-neutral/90 transition-all"
      onClick={handleClick}
      ref={modalRef}
      tabIndex={0}
    >
      {children}
    </div>
  );
};
