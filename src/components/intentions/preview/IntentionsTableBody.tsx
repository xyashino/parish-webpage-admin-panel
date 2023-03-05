import React from "react";
import { IntentionResponse } from "@backendTypes";
import { IntentionsTableRow } from "@components/intentions/preview/IntentionsTableRow";
import { IntentionsTableEmptyRow } from "@components/intentions/preview/IntentionsTableEmptyRow";

interface Props {
  intentionRow: IntentionResponse[];
}

export const IntentionsTableBody = ({ intentionRow }: Props) => {
  if (intentionRow) {
    return (
      <tbody>
        {intentionRow.map(({ hour, value, id }) => (
          <IntentionsTableRow hour={hour} value={value} key={id} />
        ))}
      </tbody>
    );
  }
  return (
    <tbody>
      <IntentionsTableEmptyRow />
    </tbody>
  );
};
