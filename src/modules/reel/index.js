import React from "react";
import { Routes, Route } from "react-router-dom";

import ReelFeedPage from "../pages/ReelFeedPage";
import ReelDetailsPage from "../pages/ReelDetailsPage";
import MyReelsPage from "../pages/MyReelsPage";

const ReelRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ReelFeedPage />} />
      <Route path="/:id" element={<ReelDetailsPage />} />
      <Route path="/my" element={<MyReelsPage />} />
    </Routes>
  );
};

export default ReelRoutes;