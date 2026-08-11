// modules/search/routes/search.routes.jsx

import { lazy } from "react";
import { Navigate } from "react-router-dom";

const SearchPage = lazy(() => import("../pages/SearchPage"));

const searchRoutes = [
  {
    path: "/search",
    element: <SearchPage />
  },
  {
    path: "/discover",
    element: <Navigate to="/search" replace />
  }
];

export default searchRoutes;