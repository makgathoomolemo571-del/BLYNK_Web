// modules/notification/routes/notification.routes.jsx

import { lazy } from "react";
import { Navigate } from "react-router-dom";
import AuthGuard from "../../../shared/components/AuthGuard";

const NotificationsPage = lazy(() =>
  import("../pages/NotificationsPage")
);

const NotificationSettingsPage = lazy(() =>
  import("../pages/NotificationSettingsPage")
);

const notificationRoutes = [
  {
    path: "/notifications",
    element: (
      <AuthGuard>
        <NotificationsPage />
      </AuthGuard>
    )
  },
  {
    path: "/notifications/settings",
    element: (
      <AuthGuard>
        <NotificationSettingsPage />
      </AuthGuard>
    )
  },
  {
    path: "*",
    element: <Navigate to="/notifications" replace />
  }
];

export default notificationRoutes;