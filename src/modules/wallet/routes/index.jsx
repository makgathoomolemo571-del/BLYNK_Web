import { lazy } from "react";
import { Navigate } from "react-router-dom";

const WalletPage = lazy(() => import("../pages/WalletPage"));
const TransactionsPage = lazy(() => import("../pages/TransactionsPage"));
const RewardsPage = lazy(() => import("../pages/RewardsPage"));
const RedeemPage = lazy(() => import("../pages/RedeemPage"));

const walletRoutes = [
  {
    path: "/wallet",
    children: [
      {
        index: true,
        element: <Navigate to="overview" replace />
      },
      {
        path: "overview",
        element: <WalletPage />
      },
      {
        path: "transactions",
        element: <TransactionsPage />
      },
      {
        path: "rewards",
        element: <RewardsPage />
      },
      {
        path: "redeem",
        element: <RedeemPage />
      }
    ]
  }
];

export default walletRoutes;