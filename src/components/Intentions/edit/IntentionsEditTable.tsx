import React, { useContext, useEffect, useState } from "react";
import { DayIntentionsResponse, IntentionResponse } from "@backendTypes";
import { IntentionsEditTableRow } from "@components/Intentions/edit/IntentionsEditTableRow";
import { IntentionContext } from "@context/IntentionContext";
import { IntentionsEditTableHead } from "@components/Intentions/edit/IntentionsEditTableHead";
import { Trash } from "@icons/Trash";
import { IntentionsEditTableFoot } from "@components/Intentions/edit/IntentionsEditTableFoot";

interface Props {
  table: DayIntentionsResponse | undefined;
}

const thStyle = "bg-primary text-xl text-base-100 ";
export const IntentionsEditTable = ({ table }: Props) => {
  if (!table) return null;
  const { intentions: tableIntentions, id, dateOfDay, day } = table;

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
