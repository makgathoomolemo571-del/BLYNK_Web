// modules/moderation/routes/moderation.routes.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";

import ReportsPage from "../pages/ReportsPage";
import UsersModerationPage from "../pages/UsersModerationPage";
import ContentModerationPage from "../pages/ContentModerationPage";

const ModerationRoutes = () => (
  <Routes>

    <Route
      index
      element={<ReportsPage />}
    />

    <Route
      path="reports"
      element={<ReportsPage />}
    />

    <Route
      path="users"
      element={<UsersModerationPage />}
    />

    <Route
      path="content"
      element={<ContentModerationPage />}
    />

  </Routes>
);

export default ModerationRoutes;