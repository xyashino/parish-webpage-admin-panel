import { PageRouter } from "@enums/page-router.enum";

export const MENU_STRUCTURE = [
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
    name: "Konto",
    items: [
      {
        text: "Dane",
        path: PageRouter.UserCurrent,
      },
    ],
  },
];
