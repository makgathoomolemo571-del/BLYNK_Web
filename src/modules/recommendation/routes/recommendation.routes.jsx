import React from "react";
import { Routes, Route } from "react-router-dom";

import RecommendationPage from "../pages/RecommendationPage";
import TrendingPage from "../pages/TrendingPage";
import DiscoverPage from "../pages/DiscoverPage";

const RecommendationRoutes = () => {
  return (
    <Routes>

      <Route
        index
        element={<RecommendationPage />}
      />

      <Route
        path="discover"
        element={<DiscoverPage />}
      />

      <Route
        path="trending"
        element={<TrendingPage />}
      />

    </Routes>
  );
};

export default RecommendationRoutes;