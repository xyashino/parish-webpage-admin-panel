import React from "react";
import { IntentionResponse } from "@backendTypes";
import parse from "html-react-parser";

export const IntentionsTableRow = ({
  hour,
  value,
}: Omit<IntentionResponse, "id">) => {
  return (
    <tr>
      <td className="border-r-1 text-center font-bold">{hour}</td>
      <td  className="whitespace-normal break-words prose">
          {parse(value)}
      </td>
    </tr>
  );
};
