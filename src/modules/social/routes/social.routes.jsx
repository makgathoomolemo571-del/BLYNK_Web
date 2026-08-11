// modules/social/routes/social.routes.jsx

import { lazy } from "react";
import { Navigate } from "react-router-dom";

import AuthGuard from "../../../shared/components/guards/AuthGuard";

const FriendsPage = lazy(() => import("../pages/FriendsPage"));
const FollowersPage = lazy(() => import("../pages/FollowersPage"));
const FollowingPage = lazy(() => import("../pages/FollowingPage"));
const FriendRequestsPage = lazy(() => import("../pages/FriendRequestsPage"));
const SuggestionsPage = lazy(() => import("../pages/SuggestionsPage"));
const BlockedUsersPage = lazy(() => import("../pages/BlockedUsersPage"));

const socialRoutes = [
  {
    path: "/social",
    element: <AuthGuard />,
    children: [
      {
        index: true,
        element: <Navigate to="friends" replace />
      },
      {
        path: "friends",
        element: <FriendsPage />
      },
      {
        path: "followers",
        element: <FollowersPage />
      },
      {
        path: "following",
        element: <FollowingPage />
      },
      {
        path: "friend-requests",
        element: <FriendRequestsPage />
      },
      {
        path: "suggestions",
        element: <SuggestionsPage />
      },
      {
        path: "blocked",
        element: <BlockedUsersPage />
      }
    ]
  }
];

export default socialRoutes;