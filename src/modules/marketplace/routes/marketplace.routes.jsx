// modules/marketplace/routes/marketplace.routes.jsx

import { lazy } from "react";
import { Navigate } from "react-router-dom";

const MarketplacePage = lazy(() => import("../pages/MarketplacePage"));
const MarketplaceDetailsPage = lazy(() => import("../pages/MarketplaceDetailsPage"));
const CreateMarketplacePage = lazy(() => import("../pages/CreateMarketplacePage"));
const EditMarketplacePage = lazy(() => import("../pages/EditMarketplacePage"));
const MyMarketplacePage = lazy(() => import("../pages/MyMarketplacePage"));

const marketplaceRoutes = [
  {
    path: "/marketplace",
    children: [
      {
        index: true,
        element: <MarketplacePage />
      },
      {
        path: "create",
        element: <CreateMarketplacePage />
      },
      {
        path: "my",
        element: <MyMarketplacePage />
      },
      {
        path: ":id",
        element: <MarketplaceDetailsPage />
      },
      {
        path: ":id/edit",
        element: <EditMarketplacePage />
      },
      {
        path: "*",
        element: <Navigate to="/marketplace" replace />
      }
    ]
  }
];

export default marketplaceRoutes;