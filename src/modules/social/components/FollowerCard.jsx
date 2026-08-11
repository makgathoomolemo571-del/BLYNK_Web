import React from "react";
import PropTypes from "prop-types";
import { FaUserFriends } from "react-icons/fa";

const FollowerCard = ({ user, onFollowBack }) => {
  if (!user) return null;

  return (
    <div className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <div className="flex items-center gap-3">
        <img
          src={user.profilePicture || "/default-avatar.png"}
          alt={user.username}
          className="w-10 h-10 rounded-full object-cover"
        />

        <div className="flex flex-col">
          <span className="font-semibold text-zinc-900 dark:text-white">
            {user.username}
          </span>

          <span className="text-xs text-zinc-500">
            Follower
          </span>
        </div>
      </div>

      <button
        onClick={() => onFollowBack?.(user._id)}
        className="flex items-center gap-2 text-sm px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
      >
        <FaUserFriends />
        Follow back
      </button>
    </div>
  );
};

FollowerCard.propTypes = {
  user: PropTypes.object,
  onFollowBack: PropTypes.func,
};

export default FollowerCard;