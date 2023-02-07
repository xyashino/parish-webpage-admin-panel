import React, { useContext, useState } from "react";
import { DayIntentionsResponse, IntentionResponse } from "@backendTypes";
import { Close } from "@icons/Close";
import { IntentionContext } from "@context/IntentionContext";

interface Props {
  intention: IntentionResponse;
  parentId: string;
}

export const IntentionsEditTableRow = ({ intention, parentId }: Props) => {
  const { setIntentions } = useContext(IntentionContext);

  const { id, hour, value } = intention;
  const [inputHour, setHour] = useState(hour);
  const [inputValue, setValue] = useState(value);

  const changeValue = (target: HTMLInputElement) => {
    if (target.name === "hour") {
      setHour(target.value);
      return;
    }
    setValue(target.value);
  };
  const updateValue = () => {
    setIntentions((prevState) => {
      const data = prevState.find(({ id: dayId }) => dayId === parentId);
      if (!data) return prevState;
      const itemIndex = data.intentions.findIndex(
        ({ id: intentionId }) => intentionId === id
      );
      data.intentions[itemIndex] = { id, hour: inputHour, value: inputValue };
      return [...prevState];
    });
  };

  const removeItem = () => {
    setIntentions((prevState) => {
      const data = prevState.find(({ id: dayId }) => dayId === parentId);
      if (!data) return prevState;
      data.intentions = data.intentions.filter(
        ({ id: intentionId }) => intentionId !== id
      );
      return [...prevState];
    });
  };

  return (
    <tr className="text-xl ">
      <td className="border-r-1 text-center font-bold">
        <input
          name="hour"
          type="text"
          value={inputHour}
          className="input-primary input w-full  appearance-none"
          onChange={(e) => changeValue(e.target)}
          onBlur={updateValue}
        />
      </td>
      <td className="flex items-center justify-around">
        <textarea
          name="value"
          value={inputValue}
          className="textarea-primary textarea mx-10 grow appearance-none"
          onChange={(e) => changeValue(e.target as unknown as HTMLInputElement)}
          onBlur={updateValue}
        />
        <Close
          className="mr-10 text-3xl text-primary hover:scale-150"
          onClick={removeItem}
        />
      </td>
    </tr>
  );
};
