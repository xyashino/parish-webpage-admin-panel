import { PageRouter } from "@enums/page-router.enum";

export type MenuItem = {
  text: string;
  path: PageRouter;
};

export type MenuType = {id:string} &
  ( {
      name: string;
      items: MenuItem[];
    }
  | MenuItem);

export const MENU_STRUCTURE: MenuType[] = [
  {
    text: "Ogłoszenia",
    path: PageRouter.Announcement,
  },
  {
    name: "Intencje",
    items: [
      {
        text: "Podgląd",
        path: PageRouter.IntentionsPreview,
      },
      {
        text: "Edytuj",
        path: PageRouter.IntentionsEdit,
      },
    ],
  },
  {
    name: "Galeria",
    items: [
      {
        text: "Grupy",
        path: PageRouter.GalleryTypes,
      },
      {
        text: "Albumy",
        path: PageRouter.GalleryAlbums,
      },
    ],
  },
  {
    text: "Administratorzy",
    path: PageRouter.Users,
  },
  {
    text: "Konto",
    path: PageRouter.UserCurrent,
  },
].map((data) => ({ ...data, id: crypto.randomUUID()}))