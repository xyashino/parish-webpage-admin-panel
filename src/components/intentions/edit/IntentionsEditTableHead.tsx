import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { TRANSLATE_INTENTIONS } from "@data/translate-intentions.data";
import { Day } from "@enums/day.enum";
import { IntentionContext } from "@context/IntentionContext";

interface Props {
  day: string | Day;
  date: string | Date;
  parentId: string;
}

const thStyle = "bg-primary text-xl text-base-100 ";

export const IntentionsEditTableHead = ({ day, date, parentId }: Props) => {
  const [dayDate, setDayDate] = useState(date);
  const { setIntentions } = useContext(IntentionContext);

  useEffect(() => {
    setDayDate(date);
  }, [date]);
  const updateDay = (e: ChangeEvent<HTMLInputElement>) => {
    setDayDate(e.target.value);
    setIntentions((prevState) => {
      let data = prevState.find(({ id }) => id === parentId);

      if (!data) return prevState;
      data.dateOfDay = e.target.value as unknown as Date;

      return [...prevState];
    });
  };

  return (
    <thead>
      <tr className="bg-neutral text-center">
        <th className="bg-primary">
          <input
            className="h-full bg-transparent text-xl text-base-100"
            type="date"
            value={dayDate + ""}
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
