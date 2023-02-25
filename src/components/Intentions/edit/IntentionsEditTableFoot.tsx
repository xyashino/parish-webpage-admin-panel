import React, { useContext } from "react";

import { Trash } from "@icons/Trash";
import { IntentionContext } from "@context/IntentionContext";
import {Btn} from "@components/ui/Btn";
export const IntentionsEditTableFoot = ({
  parentId: parentId,
}: {
  parentId: string;
}) => {
  const { setIntentions } = useContext(IntentionContext);
  const addItemEmptyItem = () => {
    setIntentions((prevState) => {
      const data = prevState.find(({ id: dayId }) => dayId === parentId);
      if (!data) return prevState;
      data.intentions.push({
        id: crypto.randomUUID(),
        hour: "",
        value: "",
      });

      return [...prevState];
    });
  };

  const clearAll = () => {
    setIntentions((prevState) => {
      const data = prevState.find(({ id: dayId }) => dayId === parentId);
      if (!data) return prevState;
      data.intentions = [];
      return [...prevState];
    });
  };

  return (
    <tfoot>
      <tr>
        <td colSpan={2} className=" bg-base-100">
          <div className="flex w-full items-center justify-around">
            <Btn
              className="btn mx-10 w-1/3 p-4 text-base-100"
              onClick={addItemEmptyItem}
            >
              Dodaj pole
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
  );
};
