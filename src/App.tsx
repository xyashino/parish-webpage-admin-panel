import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "@components/ui/AppLayout";
import { LoginPage } from "@components/pages/LoginPage";
import { PageRouter } from "@enums/page-router.enum";
import { IntentionsPreviewPage } from "@components/pages/Intentions/IntentionsPreviewPage";
import { IntentionsEditPage } from "@components/pages/Intentions/IntentionsEditPage";
import { getDataFrom } from "@utils/network/get-data-from";
import { AnnouncementEditPage } from "@components/pages/announcement/AnnouncementEditPage";
import { AnnouncementPreviewPage } from "@components/pages/announcement/AnnouncementPreviewPage";
// import { checkAuth } from "@utils/network/check-auth";
import { CurrentUserPage } from "@components/pages/CurrentUserPage";
import { NotFoundPage } from "@components/pages/NotFoundPage";
import { ErrorPage } from "@components/pages/ErrorPage";

const routers = createBrowserRouter([
  {
    path: PageRouter.Login,
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <AppLayout />,
    // loader: checkAuth,
    children: [
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
        path: PageRouter.AnnouncementEdit,
        element: <AnnouncementEditPage />,
        loader: () => getDataFrom(PageRouter.Announcement),
        errorElement: <ErrorPage />,
      },
      {
        path: PageRouter.AnnouncementPreview,
        element: <AnnouncementPreviewPage />,
        loader: () => getDataFrom(PageRouter.Announcement),
        errorElement: <ErrorPage />,
      },
      {
        path: PageRouter.UserCurrent,
        element: <CurrentUserPage />,
        loader: () => getDataFrom(PageRouter.UserCurrent),
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
