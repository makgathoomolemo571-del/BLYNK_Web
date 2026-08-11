// modules/analytics/routes/analytics.routes.jsx

import { lazy } from "react";
import { Navigate } from "react-router-dom";

const AnalyticsDashboard =
lazy(() =>
  import("../pages/AnalyticsDashboard")
);

const UserAnalytics =
lazy(() =>
  import("../pages/UserAnalytics")
);

const CreatorAnalytics =
lazy(() =>
  import("../pages/CreatorAnalytics")
);

const BusinessAnalytics =
lazy(() =>
  import("../pages/BusinessAnalytics")
);

const analyticsRoutes = [

  {
    path: "/analytics",
    element: <Navigate to="/analytics/dashboard" replace />
  },

  {
    path: "/analytics/dashboard",
    element: <AnalyticsDashboard />
  },

  {
    path: "/analytics/user",
    element: <UserAnalytics />
  },

  {
    path: "/analytics/creator",
    element: <CreatorAnalytics />
  },

  {
    path: "/analytics/business",
    element: <BusinessAnalytics />
  }

];

export default analyticsRoutes;