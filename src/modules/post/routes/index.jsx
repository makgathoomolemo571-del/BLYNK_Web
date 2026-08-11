import React from "react";
import { Route } from "react-router-dom";
import FeedPage from "../pages/FeedPage";
import PostDetailsPage from "../pages/PostDetailsPage";
import SavedPostsPage from "../pages/SavedPostsPage";

const PostRoutes = (
  <>
    <Route path="/feed" element={<FeedPage />} />
    <Route path="/post/:id" element={<PostDetailsPage />} />
    <Route path="/saved-posts" element={<SavedPostsPage />} />
  </>
);

export default PostRoutes;