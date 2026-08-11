// modules/podcast/routes/podcast.routes.jsx

import { lazy } from "react";
import { Navigate } from "react-router-dom";

const PodcastsPage = lazy(() => import("../pages/PodcastsPage"));
const PodcastDetailsPage = lazy(() => import("../pages/PodcastDetailsPage"));
const MyPodcastsPage = lazy(() => import("../pages/MyPodcastsPage"));
const CreatePodcastPage = lazy(() => import("../pages/CreatePodcastPage"));
const EditPodcastPage = lazy(() => import("../pages/EditPodcastPage"));

const podcastRoutes = [
  {
    path: "/podcasts",
    element: <PodcastsPage />
  },
  {
    path: "/podcasts/my",
    element: <MyPodcastsPage />
  },
  {
    path: "/podcasts/create",
    element: <CreatePodcastPage />
  },
  {
    path: "/podcasts/:id",
    element: <PodcastDetailsPage />
  },
  {
    path: "/podcasts/:id/edit",
    element: <EditPodcastPage />
  },
  {
    path: "*",
    element: <Navigate to="/podcasts" replace />
  }
];

export default podcastRoutes;