import { PageRouter } from "@enums/page-router.enum";

export type MenuItem = {
  text: string;
  path: PageRouter;
};

export type MenuType = {
  name: string;
  items: MenuItem[];
} | MenuItem;

export const MENU_STRUCTURE: MenuType[] = [
  {
    name: "Ogłoszenia",
    items: [
      {
        text: "Podgląd",
        path: PageRouter.AnnouncementPreview,
      },
      {
        text: "Edytuj",
        path: PageRouter.AnnouncementEdit,
      },
    ],
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
];
