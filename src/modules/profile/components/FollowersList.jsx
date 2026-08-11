// modules/profile/components/FollowersList.jsx

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useProfile } from "../hooks/useProfile";
import { Link } from "react-router-dom";

const FollowersList = ({ userId }) => {
  const { getFollowers } = useProfile();

  const followers = useSelector(
    (state) => state.profile.followers
  );

  const loading = useSelector(
    (state) => state.profile.loadingFollowers
  );

  useEffect(() => {
    if (userId) {
      getFollowers(userId);
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="p-4 text-sm text-gray-500">
        Loading followers...
      </div>
    );
  }

  if (!followers || followers.length === 0) {
    return (
      <div className="p-4 text-sm text-gray-500">
        No followers yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {followers.map((user) => (
        <Link
          to={`/profile/${user.id}`}
          key={user.id}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800"
        >
          <img
            src={user.profilePicture}
            alt={user.username}
            className="w-10 h-10 rounded-full object-cover"
          />

          <div className="flex flex-col">
            <span className="font-medium text-sm text-gray-900 dark:text-white">
              {user.username}
            </span>
            <span className="text-xs text-gray-500">
              @{user.username}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FollowersList;