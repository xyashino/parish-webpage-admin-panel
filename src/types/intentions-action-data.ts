import {DayIntentionsResponse, IntentionResponse} from "@backendTypes";
import {IntentionsAction} from "@enums/intentions-action.enum";

export type IntentionsActionData = {
    type: IntentionsAction;
    payload: { dayId?: DayIntentionsResponse["id"] , weekdays?: Date[] } & Omit<Partial<IntentionResponse>, 'id'> & Partial<DayIntentionsResponse> ;
}