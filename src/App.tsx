import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "@components/ui/AppLayout";
import { PageRouter } from "@enums/page-router.enum";
import { LoginPage } from "@pages/LoginPage";
import { checkAuth } from "@utils/network/check-auth";
import { HomePage } from "@pages/HomePage";
import { IntentionsPreviewPage } from "@pages/intentions/IntentionsPreviewPage";
import { getDataFrom } from "@utils/network/get-data-from";
import { ErrorPage } from "@pages/ErrorPage";
import { IntentionsEditPage } from "@pages/intentions/IntentionsEditPage";
import { AnnouncementPage } from "@pages/announcement/AnnouncementPage";
import { AnnouncementModifyPage } from "@pages/announcement/AnnouncementModifyPage";
import { AnnouncementsResponse } from "@backendTypes";
import { AnnouncementPreviewPage } from "@pages/announcement/AnnouncementPreviewPage";
import { UserListPage } from "@pages/users/UserListPage";
import { UserCurrentPage } from "@pages/users/UserCurrentPage";
import { GalleryTypesPage } from "@pages/gallery/GalleryTypesPage";
import { GalleryPage } from "@pages/gallery/GalleryPage";
import { GalleryEditPage } from "@pages/gallery/GalleryEditPage";
import { NotFoundPage } from "@pages/NotFoundPage";
import { RequestPath } from "@enums/request-path.enum";

const routers = createBrowserRouter([
  {
    path: PageRouter.Login,
    element: <LoginPage />,
  },
  {
    path: PageRouter.Main,
    element: <AppLayout />,
    loader: checkAuth,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: PageRouter.Intentions,
        children: [
          {
            path: PageRouter.IntentionsPreview,
            element: <IntentionsPreviewPage />,
            loader: () => getDataFrom(RequestPath.OneIntention),
            errorElement: <ErrorPage />,
          },
          {
            path: PageRouter.IntentionsEdit,
            element: <IntentionsEditPage />,
            loader: () => getDataFrom(RequestPath.OneIntention),
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        path: PageRouter.Announcement,
        children: [
          {
            index: true,
            element: <AnnouncementPage />,
            loader: () => getDataFrom(RequestPath.Announcements),
            errorElement: <ErrorPage />,
          },
          {
            path: PageRouter.AnnouncementCreate,
            element: <AnnouncementModifyPage />,
            loader: (): Omit<AnnouncementsResponse, "id"> => ({
              announcements: [],
              title: "",
              subtitle: "",
              status: null,
            }),
          },
          {
            path: PageRouter.OneAnnouncement,
            element: <AnnouncementModifyPage />,
            loader: ({ params }) =>
              getDataFrom(`${RequestPath.Announcements}${params.id}`),
            errorElement: <ErrorPage />,
          },
          {
            path: PageRouter.AnnouncementPreview,
            element: <AnnouncementPreviewPage />,
            loader: ({ params }) =>
              getDataFrom(`${RequestPath.Announcements}${params.id}`),
            errorElement: <ErrorPage />,
          },
        ],
      },

      {
        path: PageRouter.Users,
        children: [
          {
            index: true,
            element: <UserListPage />,
            loader: () => getDataFrom(RequestPath.Users),
            errorElement: <ErrorPage />,
          },
          {
            path: PageRouter.UserCurrent,
            element: <UserCurrentPage />,
            loader: () => getDataFrom(RequestPath.CurrentUser),
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        path: PageRouter.Gallery,
        children: [
          {
            path: PageRouter.GalleryTypes,
            element: <GalleryTypesPage />,
            loader: () => getDataFrom(RequestPath.AlbumTypes),
            errorElement: <ErrorPage />,
          },
          {
            path: PageRouter.GalleryAlbums,
            element: <GalleryPage />,
            loader: () => getDataFrom(RequestPath.Albums),
            errorElement: <ErrorPage />,
          },
        ],
      },

      {
        path: PageRouter.OneAlbum,
        element: <GalleryEditPage />,
        loader: ({ params: { id } }) =>
          getDataFrom(`${RequestPath.OneAlbum}${id}`),
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: PageRouter.Everything,
    element: <NotFoundPage />,
  },
]);

const App = () => {
  return <RouterProvider router={routers} />;
};

export default App;
