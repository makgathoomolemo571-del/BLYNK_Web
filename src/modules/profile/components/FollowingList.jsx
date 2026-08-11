// modules/profile/components/FollowingList.jsx

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useProfile } from "../hooks/useProfile";
import { Link } from "react-router-dom";

const FollowingList = ({ userId }) => {
  const { getFollowing } = useProfile();

  const following = useSelector(
    (state) => state.profile.following
  );

  const loading = useSelector(
    (state) => state.profile.loadingFollowing
  );

  useEffect(() => {
    if (userId) {
      getFollowing(userId);
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="p-4 text-sm text-gray-500">
        Loading following...
      </div>
    );
  }

  if (!following || following.length === 0) {
    return (
      <div className="p-4 text-sm text-gray-500">
        Not following anyone yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {following.map((user) => (
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

export default FollowingList;