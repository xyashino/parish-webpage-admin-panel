import { createContext, Dispatch, SetStateAction } from "react";
import { AnnouncementsResponse } from "@backendTypes";

interface InitialValue {
  announcements: AnnouncementsResponse;
  setAnnouncements: Dispatch<SetStateAction<AnnouncementsResponse>>;
}

const initialValue = {
  announcements: {} as AnnouncementsResponse,
  setAnnouncements: () => {},
};

export const AnnouncementContext = createContext<InitialValue>(initialValue);
