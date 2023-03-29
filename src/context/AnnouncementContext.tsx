import {createContext, Dispatch, SetStateAction} from "react";
import {AnnouncementsItem, AnnouncementsResponse} from "@backendTypes";
import {AnnouncementsActionData} from "@frontendTypes/announcements-action-data";

type RestAnnouncement = Omit<AnnouncementsResponse, 'announcements' | 'id'> & {id?:string};
interface InitialValue {
    announcements: AnnouncementsItem[];
    dispatchAnnouncements: Dispatch<AnnouncementsActionData>;
    restAnnouncement: RestAnnouncement ;
    setRestAnnouncement: Dispatch<SetStateAction<RestAnnouncement>>;
}

const initialValue = {
    announcements: [] as AnnouncementsItem[],
    dispatchAnnouncements: () => {},
    restAnnouncement: {} as RestAnnouncement,
    setRestAnnouncement: () => {},
};

export const AnnouncementContext = createContext<InitialValue>(initialValue);
