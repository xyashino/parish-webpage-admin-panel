import {AnnouncementsItem} from "@backendTypes";
import {AnnouncementsActionData} from "@frontendTypes/announcements-action-data";
import {AnnouncementsAction} from "@enums/announcements-action.enum";


const updateItem = (
    copyState: AnnouncementsItem[],
    data: Partial<AnnouncementsItem>
) => {
    const { id, body, order } = data;
    const foundItem = copyState.find((el) => el.id === id);
    if (!foundItem) return copyState;
    foundItem.order = order ?? foundItem.order;
    foundItem.body = body ?? foundItem.body;
    return [...copyState];
};

const addItem = (
    copyState: AnnouncementsItem[],
    data: Partial<AnnouncementsItem>
) => {
    const { body } = data;
    const lastItem = copyState.at(-1);
    copyState.push({
        id: crypto.randomUUID(),
        body: body ?? "",
        order: lastItem ? lastItem.order + 1 : 0,
    });
    return [...copyState];
};
export const announcementsReducer = (
    state: AnnouncementsItem[],
    action: AnnouncementsActionData
) => {
    switch (action.type) {
        case AnnouncementsAction.DELETE: {
            return state.filter(({ id }) => action.payload.id !== id);
        }
        case AnnouncementsAction.ADD: {
            return addItem([...state], {  ...action.payload });
        }
        case AnnouncementsAction.UPDATE: {
            return updateItem([...state], {  ...action.payload });
        }
        case AnnouncementsAction.CLEAR: {
            return [];
        }
        default:
            return state;
    }
};