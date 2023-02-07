import { Day } from "@enums/day.enum";

export interface Intention {
  hour: string;
  value: string;
}

export interface IntentionMenu {
  type: Day;
  title: string | undefined;
  active: boolean;
  id: string;
}
