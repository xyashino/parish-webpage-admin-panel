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
      className="fixed inset-0 z-40 flex flex-col items-center bg-neutral/40 transition-all  overflow-y-scroll"
      onClick={handleClick}
      ref={modalRef}
    >
      {children}
    </div>
  );
};
