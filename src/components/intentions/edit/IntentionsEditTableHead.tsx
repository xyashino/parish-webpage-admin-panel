import React, { ChangeEvent, useContext } from "react";
import { TRANSLATE_INTENTIONS } from "@data/translate-intentions.data";
import { Day } from "@enums/day.enum";
import { IntentionContext } from "@context/IntentionContext";
import { IntentionsAction } from "@enums/intentions-action.enum";
import { DateUtil } from "@utils/date.util";

interface Props {
  day: string | Day;
  date: string | Date;
  parentId: string;
}

const thStyle = "bg-primary text-xl text-base-100 ";

export const IntentionsEditTableHead = ({ day, date, parentId }: Props) => {
  const { dispatchIntentions } = useContext(IntentionContext);
  const updateDay = (e: ChangeEvent<HTMLInputElement>) => {
    const dateOfDay = DateUtil.formatDate(
      new Date(e.target.value)
    ) as unknown as Date;
    dispatchIntentions({
      type: IntentionsAction.UpdateDay,
      payload: { dayId: parentId, dateOfDay },
    });
  };
  return (
    <thead>
      <tr className="bg-neutral text-center">
        <th className="bg-primary">
          <input
            className="bg-transparent text-xl text-base-100"
            type="date"
            value={date + ""}
            onChange={(e) => updateDay(e)}
          />
        </th>
        <th className={thStyle}>
          {TRANSLATE_INTENTIONS.get(day as Day) ?? day}
        </th>
      </tr>

      <tr className="bg-neutral text-center">
        <th className={thStyle + "w-1/5"}>Godzina</th>
        <th className={thStyle + "w-4/5 text-left"}>Intencje Mszy ŚW.</th>
      </tr>
    </thead>
  );
};
