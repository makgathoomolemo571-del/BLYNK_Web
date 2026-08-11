// modules/post/components/PostFooter.jsx

import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  FaHeart,
  FaRegHeart,
  FaRegCommentDots,
  FaShare,
  FaBookmark,
  FaRegBookmark,
  FaFire,
  FaLaugh,
  FaSurprise,
} from "react-icons/fa";

import postApi from "../services/post.api";

const reactions = [
  {
    type: "like",
    icon: <FaHeart />,
    color: "text-red-500",
  },
  {
    type: "love",
    icon: "❤️",
    color: "text-red-500",
  },
  {
    type: "fire",
    icon: <FaFire />,
    color: "text-orange-500",
  },
  {
    type: "laugh",
    icon: <FaLaugh />,
    color: "text-yellow-500",
  },
  {
    type: "wow",
    icon: <FaSurprise />,
    color: "text-blue-500",
  },
];

export default function PostFooter({
  post,
  currentUser,
  onRefresh,
  onOpenComments,
}) {
  const [loading, setLoading] = useState(false);

  const [liked, setLiked] = useState(
    post?.liked ?? false
  );

  const [saved, setSaved] = useState(
    post?.saved ?? false
  );

  const [stats, setStats] = useState(
    post.stats
  );

  const totalLikes = useMemo(
    () => stats.likes ?? 0,
    [stats]
  );

  const react = async (type = "like") => {
    if (loading) return;

    try {
      setLoading(true);

      if (liked) {
        await postApi.unlike(post.id);

        setLiked(false);

        setStats((prev) => ({
          ...prev,
          likes: Math.max(
            0,
            prev.likes - 1
          ),
        }));
      } else {
        await postApi.like(
          post.id,
          type
        );

        setLiked(true);

        setStats((prev) => ({
          ...prev,
          likes: prev.likes + 1,
        }));
      }

      onRefresh?.();
    } finally {
      setLoading(false);
    }
  };

  const share = async () => {
    try {
      await postApi.share(post.id);

      setStats((prev) => ({
        ...prev,
        shares: prev.shares + 1,
      }));

      if (navigator.share) {
        await navigator.share({
          title: "BLYNK Post",
          url:
            window.location.origin +
            "/posts/" +
            post.id,
        });
      }
    } catch {}
  };

  const save = async () => {
    try {
      if (!saved) {
        await postApi.save(post.id);
      } else {
        await postApi.unsave(post.id);
      }

      setSaved(!saved);
    } catch {}
  };

  return (
    <div className="border-t border-zinc-200 dark:border-zinc-800 mt-4 pt-3">

      <div className="flex justify-between items-center mb-3 text-sm text-zinc-500">

        <span>
          {totalLikes.toLocaleString()} Likes
        </span>

        <span>
          {stats.comments.toLocaleString()} Comments
        </span>

        <span>
          {stats.shares.toLocaleString()} Shares
        </span>

        <span>
          {stats.views.toLocaleString()} Views
        </span>

      </div>

      <div className="grid grid-cols-4 gap-2">

        <div className="relative group">

          <button
            onClick={() => react("like")}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-lg py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            {liked ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart />
            )}

            <span>Like</span>
          </button>

          <div className="absolute bottom-full left-0 mb-2 hidden group-hover:flex bg-white dark:bg-zinc-900 rounded-full shadow-xl p-2 gap-2 z-20">

            {reactions.map((r) => (
              <button
                key={r.type}
                onClick={() =>
                  react(r.type)
                }
                className={`text-xl hover:scale-125 transition ${r.color}`}
              >
                {r.icon}
              </button>
            ))}

          </div>

        </div>

        <button
          onClick={() =>
            onOpenComments(post)
          }
          className="flex justify-center items-center gap-2 rounded-lg py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
        >
          <FaRegCommentDots />

          Comment
        </button>

        <button
          onClick={share}
          className="flex justify-center items-center gap-2 rounded-lg py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
        >
          <FaShare />

          Share
        </button>

        <button
          onClick={save}
          className="flex justify-center items-center gap-2 rounded-lg py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
        >
          {saved ? (
            <FaBookmark />
          ) : (
            <FaRegBookmark />
          )}

          Save
        </button>

      </div>
    </div>
  );
}

PostFooter.propTypes = {
  currentUser: PropTypes.object,
  onRefresh: PropTypes.func,
  onOpenComments: PropTypes.func,
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    liked: PropTypes.bool,
    saved: PropTypes.bool,
    stats: PropTypes.object.isRequired,
  }).isRequired,
};