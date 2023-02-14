import React from "react";
import { DayIntentionsResponse } from "@backendTypes";
import { IntentionsEditTableRow } from "@components/Intentions/edit/IntentionsEditTableRow";
import { IntentionsEditTableHead } from "@components/Intentions/edit/IntentionsEditTableHead";
import { IntentionsEditTableFoot } from "@components/Intentions/edit/IntentionsEditTableFoot";

interface Props {
  table: DayIntentionsResponse | undefined;
}
export const IntentionsEditTable = ({ table }: Props) => {
  if (!table) return null;
  const { intentions: tableIntentions, id } = table;

  return (
    <table className="overflow-wrap my-4 table w-full">
      <IntentionsEditTableHead
        day={table.day}
        date={table.dateOfDay ?? "0000-00-00"}
        parentId={id}
      />

      <tbody>
        {tableIntentions.map((intention) => (
          <IntentionsEditTableRow
            intention={intention}
            parentId={id}
            key={intention.id}
          />
        ))}
      </tbody>
      <IntentionsEditTableFoot parentId={id} />
    </table>
  );
};
