import { createContext, Dispatch, SetStateAction } from "react";
import { DayIntentionsResponse } from "@backendTypes";

interface InitialValue {
  intentions: [] | DayIntentionsResponse[];
  setIntentions: Dispatch<SetStateAction<DayIntentionsResponse[]>>;
}

const initialValue = {
  intentions: [],
  setIntentions: () => {},
};

export const IntentionContext = createContext<InitialValue>(initialValue);
