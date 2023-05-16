import React, {useContext} from "react";

import {Trash} from "@icons/Trash";
import {IntentionContext} from "@context/IntentionContext";
import {Btn} from "@components/ui/Btn";
import {IntentionsAction} from "@enums/intentions-action.enum";
import {useModal} from "@hooks/useModal";
import {Modal} from "@components/ui/Modal/Modal";
import {IntentionModalBody} from "@components/modal-body/IntentionModalBody";

interface Props {
  parentId: string;
}

export const IntentionsEditTableFoot = ({
  parentId: parentId,
}: Props) => {
  const { dispatchIntentions } = useContext(IntentionContext);
  const {displayModal,showModal,hideModal} = useModal();
  const addItemEmptyItem = (hour:string,value:string) => {
      dispatchIntentions({type:IntentionsAction.AddIntention , payload:{dayId:parentId, hour,value}})
  };

  const clearAll = () => {
    dispatchIntentions({type:IntentionsAction.ClearDay , payload:{dayId:parentId}})
  };


  return (
    <>
      <tfoot>
      <tr className='border-t-2 mx-4'>
        <td colSpan={2} className=" bg-base-100">
          <div className="flex w-full items-center justify-around">
            <Btn
                className="btn mx-10 w-1/3 p-4 text-base-100"
                onClick={displayModal}
            >
              Dodaj Intencje
            </Btn>
            <button
                className="text-4xl hover:scale-150"
            >
              <Trash onDoubleClick={clearAll} />
            </button>
          </div>
        </td>
      </tr>
      </tfoot>
      <Modal hideModal={hideModal} showModal={showModal} boxModalClasses='w-3/5'>
         <IntentionModalBody addField={addItemEmptyItem} hideModal={hideModal} title='Dodaj Intecje:' btnValue='Dodaj'/>
      </Modal>
    </>
  );
};
