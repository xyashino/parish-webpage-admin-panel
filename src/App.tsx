import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "@components/ui/AppLayout";
import { LoginPage } from "@components/pages/LoginPage";
import { PageRouter } from "@enums/page-router.enum";
import { IntentionsPreviewPage } from "@components/pages/intentions/IntentionsPreviewPage";
import { IntentionsEditPage } from "@components/pages/intentions/IntentionsEditPage";
import { getDataFrom } from "@utils/network/get-data-from";
import { AnnouncementModifyPage } from "@components/pages/announcement/AnnouncementModifyPage";
import { AnnouncementPreviewPage } from "@components/pages/announcement/AnnouncementPreviewPage";
import { checkAuth } from "@utils/network/check-auth";
import { UserCurrentPage } from "@components/pages/users/UserCurrentPage";
import { NotFoundPage } from "@components/pages/NotFoundPage";
import { ErrorPage } from "@components/pages/ErrorPage";
import { HomePage } from "@components/pages/HomePage";
import { UserListPage } from "@components/pages/users/UserListPage";
import { GalleryTypesPage } from "@components/pages/gallery/GalleryTypesPage";
import { GalleryPage } from "@components/pages/gallery/GalleryPage";
import {GalleryEditPage} from "@components/pages/gallery/GalleryEditPage";
import {AnnouncementPage} from "@components/pages/announcement/AnnouncementPage";
import {AnnouncementsResponse} from "@backendTypes";

const routers = createBrowserRouter([
  {
    path: PageRouter.Login,
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <AppLayout />,
    loader: checkAuth,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: PageRouter.IntentionsPreview,
        element: <IntentionsPreviewPage />,
        loader: () => getDataFrom(PageRouter.Intentions),
        errorElement: <ErrorPage />,
      },
      {
        path: PageRouter.IntentionsEdit,
        element: <IntentionsEditPage />,
        loader: () => getDataFrom(PageRouter.Intentions),
        errorElement: <ErrorPage />,
      },
      {
        path: PageRouter.Announcement,
        element: <AnnouncementPage />,
        loader: () => getDataFrom(PageRouter.Announcement),
        errorElement: <ErrorPage />,
      },
      {
        path: `${PageRouter.Announcement}create`,
        element: <AnnouncementModifyPage />,
        loader: ():Omit<AnnouncementsResponse, 'id'> => ({announcements:[],title:'',subtitle:''}),
      },
      {
        path: `${PageRouter.Announcement}:id`,
        element: <AnnouncementModifyPage />,
        loader: ({params}) => getDataFrom(`${PageRouter.Announcement}${params.id}`),
        errorElement: <ErrorPage />,
      },
      {
        path: `${PageRouter.Announcement}/:id/preview`,
        element: <AnnouncementPreviewPage />,
        loader: ({params}) => getDataFrom(`${PageRouter.Announcement}${params.id}`),
        errorElement: <ErrorPage />,
      },
      {
        path: PageRouter.UserCurrent,
        element: <UserCurrentPage />,
        loader: () => getDataFrom(PageRouter.UserCurrent),
        errorElement: <ErrorPage />,
      },
      {
        path: PageRouter.Users,
        element: <UserListPage />,
        loader: () => getDataFrom(PageRouter.Users),
        errorElement: <ErrorPage />,
      },
      {
        path: PageRouter.GalleryTypes,
        element: <GalleryTypesPage />,
        loader: () => getDataFrom(PageRouter.AlbumTypes),
        errorElement: <ErrorPage />,
      },
      {
        path: PageRouter.GalleryAlbums,
        element: <GalleryPage />,
        loader: () => getDataFrom(PageRouter.Albums),
        errorElement: <ErrorPage />,
      },
      {
        path: `${PageRouter.Albums}/:id`,
        element: <GalleryEditPage />,
        loader: ({params}) => getDataFrom(`${PageRouter.Albums}${params.id}`),
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const App = () => {
  return <RouterProvider router={routers} />;
};

export default App;
