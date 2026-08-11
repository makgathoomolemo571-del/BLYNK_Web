import React from "react";
import PropTypes from "prop-types";
import { FaUserCheck, FaUserPlus } from "react-icons/fa";

const FriendCard = ({ friend, onRemoveFriend }) => {
  if (!friend) return null;

  return (
    <div className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <div className="flex items-center gap-3">
        <img
          src={friend.profilePicture}
          alt={friend.username}
          className="w-10 h-10 rounded-full object-cover"
        />

        <div className="flex flex-col">
          <span className="font-semibold text-zinc-900 dark:text-white">
            {friend.username}
          </span>
          <span className="text-xs text-zinc-500">
            @{friend.username}
          </span>
        </div>
      </div>

      <button
        onClick={() => onRemoveFriend?.(friend.id)}
        className="flex items-center gap-2 text-sm px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600"
      >
        <FaUserCheck />
        Unfriend
      </button>
    </div>
  );
};

FriendCard.propTypes = {
  friend: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
    profilePicture: PropTypes.string,
  }),
  onRemoveFriend: PropTypes.func,
};

export default FriendCard;