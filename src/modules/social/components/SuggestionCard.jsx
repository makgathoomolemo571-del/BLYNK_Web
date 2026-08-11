import React from "react";
import PropTypes from "prop-types";
import { FaUserPlus } from "react-icons/fa";

const SuggestionCard = ({ user, onAddFriend }) => {
  if (!user) return null;

  return (
    <div className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <div className="flex items-center gap-3">
        <img
          src={user.profilePicture}
          alt={user.username}
          className="w-10 h-10 rounded-full object-cover"
        />

        <div className="flex flex-col">
          <span className="font-semibold text-zinc-900 dark:text-white">
            {user.username}
          </span>
          <span className="text-xs text-zinc-500">
            Suggested
          </span>
        </div>
      </div>

      <button
        onClick={() => onAddFriend?.(user.id)}
        className="flex items-center gap-2 text-sm px-3 py-1 rounded-lg bg-purple-500 text-white hover:bg-purple-600"
      >
        <FaUserPlus />
        Add
      </button>
    </div>
  );
};

SuggestionCard.propTypes = {
  user: PropTypes.object,
  onAddFriend: PropTypes.func,
};

export default SuggestionCard;