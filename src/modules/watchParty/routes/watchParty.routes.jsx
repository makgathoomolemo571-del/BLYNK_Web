// modules/watchParty/routes/watchParty.routes.jsx

import { lazy } from "react";
import { Navigate } from "react-router-dom";

import DashboardLayout from "../../../layouts/DashboardLayout";

import ProtectedRoute from "../../../shared/components/ProtectedRoute";

const WatchPartyHome = lazy(() =>
  import("../pages/WatchPartyHome")
);

const WatchPartyDetails = lazy(() =>
  import("../pages/WatchPartyDetails")
);

const WatchPartyLive = lazy(() =>
  import("../pages/WatchPartyLive")
);

const MyWatchParties = lazy(() =>
  import("../pages/MyWatchParties")
);

const watchPartyRoutes = [
  {
    path: "/watch-parties",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),

    children: [
      {
        index: true,
        element: <Navigate to="live" replace />
      },

      {
        path: "live",
        element: <WatchPartyHome />
      },

      {
        path: "mine",
        element: <MyWatchParties />
      },

      {
        path: ":id",
        element: <WatchPartyDetails />
      },

      {
        path: ":id/live",
        element: <WatchPartyLive />
      }
    ]
  }
];

export default watchPartyRoutes;