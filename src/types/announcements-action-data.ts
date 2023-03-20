import { AnnouncementsAction } from "@enums/announcements-action.enum";
import {AnnouncementsItem} from "@backendTypes";

export interface AnnouncementsActionData {
      type: AnnouncementsAction;
      payload: Partial<AnnouncementsItem>
    }
