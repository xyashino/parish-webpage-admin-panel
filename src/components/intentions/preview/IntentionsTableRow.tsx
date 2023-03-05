import React from "react";
import { IntentionResponse } from "@backendTypes";

export const IntentionsTableRow = ({
  hour,
  value,
}: Omit<IntentionResponse, "id">) => {
  return (
    <tr>
      <td className="border-r-1 text-center font-bold">{hour}</td>
      <td>
        <p className="whitespace-normal break-words">{value}</p>
      </td>
    </tr>
  );
};
