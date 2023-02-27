import { PropsWithChildren, SyntheticEvent } from "react";
import { Close } from "@icons/Close";

interface Props extends PropsWithChildren {
  hideModal:(e:SyntheticEvent)=>void;
  boxModalClasses?:string;
}

export const ModalBox = ({ children,hideModal,boxModalClasses }: Props) => {
    const boxModalStyles = `min-h-1/3 bg-white flex flex-col justify-center rounded ${boxModalClasses}`
  return (
      <div className={boxModalStyles}>
          <header className='flex flex-row-reverse w-full pt-4 px-8'>
                <Close className='text-4xl hover:scale-125' onClick={hideModal}/>
                <div className='grow m-4 border-b-2 align-self-start'></div>
          </header>
          <div className='p-4'>
              {children}
          </div>
      </div>
  );
};
