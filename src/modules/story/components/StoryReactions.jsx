import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  FaHeart,
  FaRegHeart,
  FaSmile,
  FaLaugh,
  FaSadTear,
  FaAngry,
} from "react-icons/fa";
import storyService from "../services/story.api";

const REACTIONS = [
  { type: "like", icon: <FaHeart />, label: "Like", color: "text-red-500" },
  { type: "love", icon: <FaHeart />, label: "Love", color: "text-pink-500" },
  { type: "haha", icon: <FaLaugh />, label: "Haha", color: "text-yellow-500" },
  { type: "wow", icon: <FaSmile />, label: "Wow", color: "text-blue-500" },
  { type: "sad", icon: <FaSadTear />, label: "Sad", color: "text-indigo-500" },
  { type: "angry", icon: <FaAngry />, label: "Angry", color: "text-orange-500" },
];

const StoryReactions = ({ storyId, initialReactions = [] }) => {
  const [reactions, setReactions] = useState(initialReactions);
  const [loading, setLoading] = useState(false);

  const reactionCount = useMemo(() => {
    return reactions.reduce((acc, r) => {
      acc[r.type] = (acc[r.type] || 0) + 1;
      return acc;
    }, {});
  }, [reactions]);

  const handleReact = async (type) => {
    if (loading) return;

    try {
      setLoading(true);

      const res = await storyService.reactStory(storyId, type);

      setReactions(res.reactions || []);
    } catch (err) {
      console.error("STORY_REACTION_ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {REACTIONS.map((r) => (
          <button
            key={r.type}
            onClick={() => handleReact(r.type)}
            disabled={loading}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:scale-105 transition"
          >
            <span className={r.color}>{r.icon}</span>
            <span className="text-xs font-medium text-zinc-700 dark:text-zinc-200">
              {r.label}
            </span>

            {reactionCount[r.type] ? (
              <span className="text-xs ml-1 text-zinc-500">
                {reactionCount[r.type]}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      <div className="text-xs text-zinc-500">
        Total reactions: {reactions.length}
      </div>
    </div>
  );
};

StoryReactions.propTypes = {
  storyId: PropTypes.string.isRequired,
  initialReactions: PropTypes.array,
};

export default StoryReactions;