import React from "react";
import PropTypes from "prop-types";
import { FaCheck, FaTimes } from "react-icons/fa";

const FriendRequestCard = ({ request, onAccept, onReject }) => {
  if (!request) return null;

  return (
    <div className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <div className="flex items-center gap-3">
        <img
          src={request.from.profilePicture}
          alt={request.from.username}
          className="w-10 h-10 rounded-full object-cover"
        />

        <div className="flex flex-col">
          <span className="font-semibold text-zinc-900 dark:text-white">
            {request.from.username}
          </span>
          <span className="text-xs text-zinc-500">
            Friend request
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onAccept?.(request.id)}
          className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
        >
          <FaCheck />
        </button>

        <button
          onClick={() => onReject?.(request.id)}
          className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

FriendRequestCard.propTypes = {
  request: PropTypes.object,
  onAccept: PropTypes.func,
  onReject: PropTypes.func,
};

export default FriendRequestCard;