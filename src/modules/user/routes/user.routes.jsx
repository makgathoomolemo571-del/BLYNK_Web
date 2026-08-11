import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

/**
 * Pages
 */
import UserProfile from "../pages/UserProfile";
import Followers from "../pages/Followers";
import Following from "../pages/Following";
import SavedPosts from "../pages/SavedPosts";

/**
 * Auth Guard (assumes you already have this in shared or auth module)
 */
import ProtectedRoute from "../../../shared/components/ProtectedRoute";

/**
 * User Routes (PRODUCTION)
 */
const UserRoutes = () => {
  return (
    <Routes>
      {/* Profile */}
      <Route
        path="/profile/:username"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />

      {/* Followers */}
      <Route
        path="/profile/:username/followers"
        element={
          <ProtectedRoute>
            <Followers />
          </ProtectedRoute>
        }
      />

      {/* Following */}
      <Route
        path="/profile/:username/following"
        element={
          <ProtectedRoute>
            <Following />
          </ProtectedRoute>
        }
      />

      {/* Saved Posts */}
      <Route
        path="/profile/:username/saved"
        element={
          <ProtectedRoute>
            <SavedPosts />
          </ProtectedRoute>
        }
      />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/profile/me" replace />} />
    </Routes>
  );
};

export default UserRoutes;