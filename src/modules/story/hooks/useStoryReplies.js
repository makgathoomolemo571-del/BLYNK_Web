import { useState, useCallback } from "react";
import storyService from "../services/story.api";

/**
 * useStoryReplies
 * Handles replies on stories
 */
const useStoryReplies = (storyId) => {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReplies = useCallback(async () => {
    if (!storyId) return;

    try {
      setLoading(true);
      setError(null);

      const data = await storyService.getStoryReplies(storyId);

      setReplies(data || []);
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, [storyId]);

  const sendReply = useCallback(async (text) => {
    if (!text?.trim()) return;

    try {
      const newReply = await storyService.replyToStory(storyId, {
        text,
      });

      setReplies((prev) => [newReply, ...prev]);
    } catch (err) {
      console.error("Reply failed:", err);
    }
  }, [storyId]);

  const deleteReply = useCallback(async (replyId) => {
    try {
      await storyService.deleteStoryReply(storyId, replyId);

      setReplies((prev) =>
        prev.filter((r) => r.id !== replyId)
      );
    } catch (err) {
      console.error("Delete reply failed:", err);
    }
  }, [storyId]);

  return {
    replies,
    loading,
    error,
    fetchReplies,
    sendReply,
    deleteReply,
  };
};

export default useStoryReplies;