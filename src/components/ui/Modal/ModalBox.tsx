import { PropsWithChildren, SyntheticEvent } from "react";
import { Close } from "@icons/Close";
import {Divider} from "@components/ui/Divider";

interface Props extends PropsWithChildren {
  hideModal: (e: SyntheticEvent) => void;
  boxModalClasses?: string;
}

export const ModalBox = ({ children, hideModal, boxModalClasses }: Props) => {
  const boxModalStyles = `absolute top-1/2 left-1/2 bg-white  top-50  justify-center rounded overflow-y-scroll max-h-[80%] -translate-x-1/2 -translate-y-1/2 ${boxModalClasses}`;
  return (
    <div className={boxModalStyles}>
      <header className="flex w-full flex-row-reverse px-8 pt-4 ">
        <Close className="text-4xl hover:scale-125" onClick={hideModal} />
        <div className="align-self-start m-4 grow border-b-2"></div>
      </header>
      <div className="p-4">{children}</div>
        <Divider className='mx-16'/>
    </div>
  );
};
