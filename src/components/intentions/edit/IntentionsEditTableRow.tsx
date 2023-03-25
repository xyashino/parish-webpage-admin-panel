import React, { useContext } from "react";
import { IntentionResponse } from "@backendTypes";
import { Close } from "@icons/Close";
import { IntentionContext } from "@context/IntentionContext";
import { IntentionsAction } from "@enums/intentions-action.enum";
import parse from "html-react-parser";
import { Edit } from "@icons/Edit";
import { useModal } from "@hooks/useModal";
import { Modal } from "@components/ui/Modal/Modal";
import { IntentionModalBody } from "@components/modal-body/IntentionModalBody";

interface Props {
  intention: IntentionResponse;
  parentId: string;
}

export const IntentionsEditTableRow = ({ intention, parentId }: Props) => {
  const { dispatchIntentions } = useContext(IntentionContext);
  const { displayModal, showModal, hideModal } = useModal();
  const { id, hour, value } = intention;
  const updateValue = (hour: string, value: string) => {
    dispatchIntentions({
      type: IntentionsAction.UpdateIntention,
      payload: { dayId: parentId, id, hour, value },
    });
  };

  const removeItem = () => {
    dispatchIntentions({
      type: IntentionsAction.DeleteIntention,
      payload: { dayId: parentId, id },
    });
  };

  return (
    <>
      <tr className="p-4 text-xl">
        <td className="border-r-1 text-center font-bold">{hour}</td>
        <td className="flex items-center justify-around">
          <div className="prose w-3/4 p-4">{parse(value)}</div>
          <Edit
            className="mr-10 text-3xl hover:scale-150"
            onClick={displayModal}
          />
          <Close
            className="mr-10 text-3xl hover:scale-150"
            onClick={removeItem}
          />
        </td>
      </tr>
      <Modal hideModal={hideModal} showModal={showModal}>
        <IntentionModalBody
          addField={updateValue}
          hideModal={hideModal}
          baseValue={{ defaultEditorValue: value, hour }}
          title="Edytuj Intencje:"
          btnValue="Zapisz"
        />
      </Modal>
    </>
  );
};
