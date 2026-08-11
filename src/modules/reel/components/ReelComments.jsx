import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaPaperPlane, FaTrash } from "react-icons/fa";

/**
 * ReelComments - Production Component
 * Uses backend expected structure:
 * comment = {
 *   id,
 *   user: { id, username, profilePicture },
 *   text,
 *   createdAt
 * }
 */

const ReelComments = ({
  reelId,
  comments = [],
  currentUser,
  onAddComment,
  onDeleteComment,
  loading = false,
}) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    await onAddComment({
      reelId,
      text: text.trim(),
    });

    setText("");
  };

  const handleDelete = (commentId) => {
    if (onDeleteComment) {
      onDeleteComment({ reelId, commentId });
    }
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col h-full">
      
      {/* COMMENTS LIST */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading && (
          <p className="text-sm text-zinc-500">Loading comments...</p>
        )}

        {!loading && comments.length === 0 && (
          <p className="text-sm text-zinc-500 text-center">
            No comments yet
          </p>
        )}

        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex items-start gap-3"
          >
            <img
              src={comment.user?.profilePicture || "/default-avatar.png"}
              alt={comment.user?.username}
              className="w-8 h-8 rounded-full object-cover"
            />

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                  {comment.user?.username}
                </span>

                {currentUser?.id === comment.user?.id && (
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTrash size={12} />
                  </button>
                )}
              </div>

              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                {comment.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <form
        onSubmit={handleSubmit}
        className="p-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-2"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 bg-zinc-100 dark:bg-zinc-800 text-sm rounded-full px-4 py-2 outline-none"
        />

        <button
          type="submit"
          className="text-blue-600 hover:text-blue-700"
        >
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

ReelComments.propTypes = {
  reelId: PropTypes.string.isRequired,
  comments: PropTypes.array,
  currentUser: PropTypes.object,
  onAddComment: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func,
  loading: PropTypes.bool,
};

export default ReelComments;