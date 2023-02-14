import React from "react";
import { IntentionsPreviewTableRow } from "./IntentionsPreviewTableRow";
import { IntentionResponse } from "@backendTypes";
import { Day } from "@enums/day.enum";
import { TRANSLATE_INTENTIONS } from "@data/translate-intentions.data";
interface Props {
  day: string;
  intentionRow: IntentionResponse[];
}
const thStyle = "bg-primary text-xl text-base-100 ";
export const IntentionsPreviewTable = ({ day, intentionRow }: Props) => {
  return (
    <table className="overflow-wrap table w-full grow">
      <thead>
        <tr className="bg-neutral text-center">
          <th colSpan={2} className={thStyle}>
            {TRANSLATE_INTENTIONS.get(day as unknown as Day) ?? day}
          </th>
        </tr>
        <tr className="bg-neutral text-center">
          <th className={thStyle + "w-1/5"}>Godzina</th>
          <th className={thStyle + "w-4/5 text-left"}>Intencje Mszy ŚW.</th>
        </tr>
      </thead>
      <tbody>
        {intentionRow.map(({ hour, value, id }) => (
          <IntentionsPreviewTableRow hour={hour} value={value} key={id} />
        ))}
      </tbody>
    </table>
  );
};
