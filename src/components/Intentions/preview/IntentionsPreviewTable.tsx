import React from "react";
import { DayIntentionsResponse, IntentionResponse } from "@backendTypes";
import { IntentionsTableHead } from "@components/Intentions/preview/IntentionsTableHead";
import { IntentionsTableBody } from "@components/Intentions/preview/IntentionsTableBody";

interface Props {
  day: DayIntentionsResponse["day"];
  intentionRow: IntentionResponse[];
  dateOfDay: DayIntentionsResponse["dateOfDay"];
}

export const IntentionsPreviewTable = ({
  day,
  intentionRow,
  dateOfDay,
}: Props) => {
  return (
    <table className="overflow-wrap table w-full grow">
      <IntentionsTableHead day={day} dateOfDay={dateOfDay} />
      <IntentionsTableBody intentionRow={intentionRow} />
    </table>
  );
};
