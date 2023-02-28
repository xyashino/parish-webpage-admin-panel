import { PropsWithChildren, SyntheticEvent } from "react";
import { Close } from "@icons/Close";

interface Props extends PropsWithChildren {
  hideModal: (e: SyntheticEvent) => void;
  boxModalClasses?: string;
}

export const ModalBox = ({ children, hideModal, boxModalClasses }: Props) => {
  const boxModalStyles = `min-h-1/3 bg-white bas flex flex-col justify-center rounded ${boxModalClasses}`;
  return (
    <div className={boxModalStyles}>
      <header className="flex w-full flex-row-reverse px-8 pt-4">
        <Close className="text-4xl hover:scale-125" onClick={hideModal} />
        <div className="align-self-start m-4 grow border-b-2"></div>
      </header>
      <div className="p-4">{children}</div>
    </div>
  );
};
