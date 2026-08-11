import React, { useEffect, useState, useCallback } from "react";
import storyApi from "../services/story.api";
import { formatDistanceToNow } from "date-fns";

const StoryArchivePage = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchArchivedStories = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const res = await storyApi.getArchivedStories();

      setStories(res?.data || []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Failed to load archived stories"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArchivedStories();
  }, [fetchArchivedStories]);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-10 text-zinc-500">
        Loading archived stories...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex items-center justify-center py-10 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">
        Story Archive
      </h1>

      {stories.length === 0 ? (
        <div className="text-zinc-500 text-center py-10">
          No archived stories
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stories.map((story) => (
            <div
              key={story.id}
              className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 bg-white dark:bg-zinc-900"
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={story.creator?.profilePicture}
                  alt="creator"
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div className="flex flex-col">
                  <span className="font-medium text-zinc-900 dark:text-white">
                    {story.creator?.username}
                  </span>

                  <span className="text-xs text-zinc-500">
                    {formatDistanceToNow(new Date(story.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>

              {story.media && (
                <div className="mb-3">
                  {story.type === "image" && (
                    <img
                      src={story.media}
                      alt="story"
                      className="w-full rounded-lg object-cover max-h-64"
                    />
                  )}

                  {story.type === "video" && (
                    <video
                      src={story.media}
                      controls
                      className="w-full rounded-lg max-h-64"
                    />
                  )}
                </div>
              )}

              {story.caption && (
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  {story.caption}
                </p>
              )}

              <div className="flex justify-between mt-3 text-xs text-zinc-500">
                <span>{story.views || 0} views</span>
                <span>
                  Expires:{" "}
                  {story.expiresAt
                    ? new Date(story.expiresAt).toLocaleString()
                    : "N/A"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoryArchivePage;