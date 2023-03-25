import { DayIntentionsResponse, IntentionResponse } from "@backendTypes";
import { IntentionsActionData } from "@frontendTypes/intentions-action-data";
import { IntentionsAction } from "@enums/intentions-action.enum";
import { DateUtil } from "@utils/date.util";

interface FoundDayResult {
  foundDay: DayIntentionsResponse;
  foundIndex: number;
  copyIntentions: DayIntentionsResponse[];
}
const findDay = (
  intentions: DayIntentionsResponse[],
  id: string
): FoundDayResult => {
  const copyIntentions = [...intentions];
  const foundIndex = copyIntentions.findIndex((value) => value.id === id);
  return {
    foundDay: intentions[foundIndex],
    foundIndex: foundIndex,
    copyIntentions,
  };
};

const addIntention = (
  state: DayIntentionsResponse[],
  dayId: string,
  hour: string = "",
  value: string = ""
): DayIntentionsResponse[] => {
  const { copyIntentions, foundIndex, foundDay } = findDay(state, dayId);
  if (foundIndex === -1) return state;
  const id = crypto.randomUUID();
  foundDay.intentions.push({
    id,
    hour,
    value,
  });
  return copyIntentions;
};
const clearDay = (
  state: DayIntentionsResponse[],
  dayId: string
): DayIntentionsResponse[] => {
  const { copyIntentions, foundIndex } = findDay(state, dayId);
  if (foundIndex === -1) {
    return state;
  }
  copyIntentions[foundIndex].intentions = [];
  return copyIntentions;
};

const deleteIntention = (
  state: DayIntentionsResponse[],
  dayId: string,
  id: string
): DayIntentionsResponse[] => {
  const { copyIntentions, foundIndex, foundDay } = findDay(state, dayId);
  if (foundIndex === -1) return state;
  foundDay.intentions = foundDay.intentions.filter((value) => id !== value.id);
  return copyIntentions;
};

const updateWeek = (
  state: DayIntentionsResponse[],
  weekdays: Date[]
): DayIntentionsResponse[] => {
  const newValue = state.map(({ dateOfDay, ...rest }, i) => ({
    ...rest,
    dateOfDay: DateUtil.formatDate(weekdays[i]) as unknown as Date,
  }));
  return [...newValue];
};

const updateIntention = (
  state: DayIntentionsResponse[],
  dayId: string,
  hour: string,
  value: string,
  id: string
): DayIntentionsResponse[] => {
  const { copyIntentions, foundIndex, foundDay } = findDay(state, dayId);
  if (foundIndex === -1) return state;
  const foundIntention = foundDay.intentions.find(
    ({ id: intentionId }) => intentionId === id
  );
  if (!foundIntention) return state;
  foundIntention.hour = hour;
  foundIntention.value = value;
  return copyIntentions;
};
const updateDay = (
  state: DayIntentionsResponse[],
  dayId: string,
  data: {
    dateOfDay: Date | null | undefined;
    intentions: IntentionResponse[] | undefined;
  }
) => {
  const { dateOfDay, intentions } = data;
  const { foundDay ,copyIntentions} = findDay(state, dayId);
  if (dateOfDay) foundDay.dateOfDay = <Date>dateOfDay;
  if (intentions) foundDay.intentions = intentions;
  return copyIntentions;
};
export const intentionsReducer = (
  state: DayIntentionsResponse[],
  action: IntentionsActionData
):DayIntentionsResponse[] => {
  const { payload } = action;
  switch (action.type) {
    case IntentionsAction.ClearDay: {
      if (!payload.dayId) return state;
      return clearDay(state, payload.dayId);
    }
    case IntentionsAction.AddIntention: {
      if (!payload.dayId) return state;
      return addIntention(state, payload.dayId, payload.hour, payload.value);
    }
    case IntentionsAction.DeleteIntention: {
      if (!payload.dayId || !payload.id) return state;
      return deleteIntention(state, payload.dayId, payload.id);
    }
    case IntentionsAction.UpdateWeek: {
      const { weekdays } = payload;
      if (!weekdays) return state;
      return updateWeek(state, weekdays);
    }
    case IntentionsAction.UpdateIntention: {
      const { dayId, hour, value, id } = payload;
      if (!dayId || !hour || !value || !id) return state;
      return updateIntention(state, dayId, hour, value, id);
    }
    case IntentionsAction.UpdateDay: {
      const { dayId , intentions ,dateOfDay} = payload;
      if(!dayId) return state;
      return updateDay(state, dayId , {intentions,dateOfDay});
    }
    default:
      return state;
  }
};
