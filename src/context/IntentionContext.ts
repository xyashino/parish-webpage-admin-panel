import { createContext, Dispatch } from "react";
import { DayIntentionsResponse } from "@backendTypes";
import {IntentionsActionData} from "@frontendTypes/intentions-action-data";

interface InitialValue {
  intentions: [] | DayIntentionsResponse[];
  dispatchIntentions: Dispatch<IntentionsActionData>;
}

const initialValue = {
  intentions: [],
  dispatchIntentions: () => {},
};

export const IntentionContext = createContext<InitialValue>(initialValue);
