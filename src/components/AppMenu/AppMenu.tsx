import { PageRouter } from "@enums/page-router.enum";
import { Logo } from "@icons/Logo";
import { AppMenuItem } from "@components/AppMenu/AppMenuItem";
import { Submenu } from "@components/AppMenu/Submenu";
interface Props {
  title: string;
}
const MENU_STRUCTURE = [
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
      // {
      //   text: "Podgląd",
      //   path: PageRouter.IntentionsPreview,
      // },
      // {
      //   text: "Edytuj",
      //   path: PageRouter.IntentionsEdit,
      // },
      {
        text: "Dane",
        path: PageRouter.UserCurrent,
      },
    ],
  },
];

export const AppMenu = () => {
  return (
    <nav className="sticky top-0 flex h-screen w-1/6 flex-col bg-base-100 shadow">
      <div className="flex items-center bg-primary p-4 text-lg font-bold uppercase text-base-100 shadow">
        <Logo className="mr-2 text-6xl" />
        <h2>Parafia Gruszów wielki</h2>
      </div>
      <ul className="menu  bg-base-100">
        {MENU_STRUCTURE.map(({ name, items }) => (
          <AppMenuItem name={name} items={items} key={name} />
        ))}
      </ul>
    </nav>
  );
};
