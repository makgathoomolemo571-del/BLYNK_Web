import React from "react";
import PropTypes from "prop-types";

const MutualFriends = ({ users = [] }) => {
  if (!users.length) {
    return (
      <p className="text-sm text-zinc-500">
        No mutual friends
      </p>
    );
  }

  return (
    <div className="flex -space-x-3">
      {users.slice(0, 5).map((user) => (
        <img
          key={user.id}
          src={user.profilePicture}
          alt={user.username}
          className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-900 object-cover"
        />
      ))}

      {users.length > 5 && (
        <div className="w-8 h-8 flex items-center justify-center text-xs bg-zinc-200 dark:bg-zinc-700 rounded-full">
          +{users.length - 5}
        </div>
      )}
    </div>
  );
};

MutualFriends.propTypes = {
  users: PropTypes.array,
};

export default MutualFriends;