import React, { useReducer, useState } from "react";
import { MainContainer } from "@components/ui/MainContainer";
import { Header } from "@components/ui/Header";
import { useLoaderData } from "react-router-dom";
import { AnnouncementsItem, AnnouncementsResponse } from "@backendTypes";
import { AnnouncementEditHeader } from "@components/announcement/edit/AnnouncementEditHeader";
import { AnnouncementContext } from "@context/AnnouncementContext";
import { AnnouncementEditBody } from "@components/announcement/edit/AnnouncementEditBody";
import { AnnouncementEditFooter } from "@components/announcement/edit/AnnouncementEditFooter";
import { AnnouncementEditBodyItem } from "@components/announcement/edit/AnnouncementEditButtonsSection";
import { AnnouncementsAction } from "@enums/announcements-action.enum";
import { AnnouncementsActionData } from "@frontendTypes/announcements-action-data";

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
    order: lastItem ? lastItem.order + 1 : -1,
  });
  return [...copyState];
};
const announcementsReducer = (
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
export const AnnouncementEditPage = () => {
  const [{ announcements: announcementsResponse, ...rest }] =
    useLoaderData() as AnnouncementsResponse[];
  const [announcements, dispatchAnnouncements] = useReducer(
    announcementsReducer,
    announcementsResponse
  );
  const [restAnnouncement, setRestAnnouncement] = useState(rest);

  return (
    <AnnouncementContext.Provider
      value={{
        announcements,
        dispatchAnnouncements,
        restAnnouncement,
        setRestAnnouncement,
      }}
    >
      <MainContainer>
        <Header title="Edytuj ogłoszenia " />
        <AnnouncementEditBodyItem />
        <div className="mt-4 flex w-full flex-col items-center  bg-base-100">
          <article className="prose prose-neutral w-full py-4 lg:prose-xl">
            <AnnouncementEditHeader />
            <AnnouncementEditBody />
            <AnnouncementEditFooter />
          </article>
        </div>
      </MainContainer>
    </AnnouncementContext.Provider>
  );
};
