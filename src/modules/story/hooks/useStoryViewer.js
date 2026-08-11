import { useEffect, useState, useCallback } from "react";
import storyService from "../services/story.api";

/**
 * useStoryViewer
 * Handles viewing stories + tracking view state
 */
const useStoryViewer = (storyId, userId) => {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [viewed, setViewed] = useState(false);
  const [error, setError] = useState(null);

  const fetchStory = useCallback(async () => {
    if (!storyId) return;

    try {
      setLoading(true);
      setError(null);

      const data = await storyService.getStoryById(storyId);

      setStory(data);

      return data;
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, [storyId]);

  const viewStory = useCallback(async () => {
    if (!storyId || !userId || viewed) return;

    try {
      await storyService.viewStory(storyId);
      setViewed(true);
    } catch (err) {
      console.error("Story view failed:", err);
    }
  }, [storyId, userId, viewed]);

  const reactToStory = useCallback(async (reaction) => {
    try {
      await storyService.reactStory(storyId, reaction);

      setStory((prev) => ({
        ...prev,
        reactions: [
          ...(prev?.reactions || []),
          { userId, reaction },
        ],
      }));
    } catch (err) {
      console.error("Reaction failed:", err);
    }
  }, [storyId, userId]);

  useEffect(() => {
    fetchStory();
  }, [fetchStory]);

  useEffect(() => {
    viewStory();
  }, [viewStory]);

  return {
    story,
    loading,
    error,
    viewed,
    refetch: fetchStory,
    reactToStory,
  };
};

export default useStoryViewer;