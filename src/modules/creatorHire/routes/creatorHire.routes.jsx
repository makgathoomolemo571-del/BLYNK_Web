// modules/creatorHire/routes/creatorHire.routes.jsx

import { lazy } from "react";
import { Navigate } from "react-router-dom";

const CreatorHirePage = lazy(() => import("../pages/CreatorHirePage"));
const CreatorHireDetailsPage = lazy(() => import("../pages/CreatorHireDetailsPage"));
const MyApplicationsPage = lazy(() => import("../pages/MyApplicationsPage"));
const MyListingsPage = lazy(() => import("../pages/MyListingsPage"));

const creatorHireRoutes = [
  {
    path: "/creator-hire",
    element: <CreatorHirePage />
  },
  {
    path: "/creator-hire/:id",
    element: <CreatorHireDetailsPage />
  },
  {
    path: "/creator-hire/my-applications",
    element: <MyApplicationsPage />
  },
  {
    path: "/creator-hire/my-listings",
    element: <MyListingsPage />
  },
  {
    path: "*",
    element: <Navigate to="/creator-hire" replace />
  }
];

export default creatorHireRoutes;