import React from "react";
import { TRANSLATE_INTENTIONS } from "@data/translate-intentions.data";
import { DayIntentionsResponse } from "@backendTypes";
import { DateUtil } from "@utils/date.util";
interface Props {
  day: DayIntentionsResponse["day"];
  dateOfDay: DayIntentionsResponse["dateOfDay"];
}
const thStyle = "bg-primary text-xl text-base-100 ";
export const IntentionsTableHead = ({ day, dateOfDay }: Props) => {
  return (
    <thead>
      <tr className="bg-neutral text-center">
        <th colSpan={2} className={thStyle}>
          {TRANSLATE_INTENTIONS.get(day) ?? day}
          {dateOfDay ? DateUtil.getDayAndMonth(dateOfDay) : ""}
        </th>
      </tr>
      <tr className="bg-neutral text-center">
        <th className={thStyle + "w-1/5"}>Godzina</th>
        <th className={thStyle + "w-4/5 text-left"}>Intencje Mszy ŚW.</th>
      </tr>
    </thead>
  );
};
