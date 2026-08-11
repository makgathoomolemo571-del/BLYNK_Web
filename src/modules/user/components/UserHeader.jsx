import React from "react";
import PropTypes from "prop-types";

import UserAvatar from "./UserAvatar";
import UserBadge from "./UserBadge";

const UserHeader = ({
  user,
  profile,
  onEditProfile,
  onMessage,
  onFollow,
  onUnfollow,
  isOwner = false,
  isFollowing = false,
  loading = false,
}) => {
  if (!user || !profile) return null;

  const fullName =
    profile.displayName ||
    `${profile.firstName || ""} ${profile.lastName || ""}`.trim() ||
    user.username;

  return (
    <div className="w-full rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 shadow border border-zinc-200 dark:border-zinc-800">

      {/* Cover */}
      <div className="relative h-56 w-full bg-zinc-200 dark:bg-zinc-800">
        {profile.coverBanner && (
          <img
            src={profile.coverBanner}
            alt={fullName}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="px-8 pb-8">

        {/* Avatar */}
        <div className="-mt-20">
          <UserAvatar
            src={profile.profilePicture}
            username={user.username}
            size={150}
          />
        </div>

        {/* User Info */}
        <div className="mt-5 flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">

          <div>

            <div className="flex items-center gap-3">

              <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
                {fullName}
              </h1>

              <UserBadge
                role={user.role}
                verified={user.verified}
              />

            </div>

            <p className="text-zinc-500 mt-1">
              @{user.username}
            </p>

            {profile.bio && (
              <p className="mt-5 max-w-3xl text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
                {profile.bio}
              </p>
            )}

            {profile.location && (
              <p className="mt-3 text-sm text-zinc-500">
                📍 {profile.location}
              </p>
            )}

            {profile.website && (
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-blue-600 hover:underline"
              >
                {profile.website}
              </a>
            )}

          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">

            {isOwner ? (
              <button
                onClick={onEditProfile}
                disabled={loading}
                className="px-6 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
              >
                Edit Profile
              </button>
            ) : (
              <>
                {isFollowing ? (
                  <button
                    onClick={onUnfollow}
                    disabled={loading}
                    className="px-6 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition disabled:opacity-50"
                  >
                    Following
                  </button>
                ) : (
                  <button
                    onClick={onFollow}
                    disabled={loading}
                    className="px-6 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    Follow
                  </button>
                )}

                <button
                  onClick={onMessage}
                  disabled={loading}
                  className="px-6 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition disabled:opacity-50"
                >
                  Message
                </button>
              </>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

UserHeader.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string.isRequired,
    email: PropTypes.string,
    role: PropTypes.string,
    verified: PropTypes.bool,
    status: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,

  profile: PropTypes.shape({
    profilePicture: PropTypes.string,
    coverBanner: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    displayName: PropTypes.string,
    bio: PropTypes.string,
    location: PropTypes.string,
    website: PropTypes.string,
  }).isRequired,

  isOwner: PropTypes.bool,
  isFollowing: PropTypes.bool,
  loading: PropTypes.bool,

  onEditProfile: PropTypes.func,
  onMessage: PropTypes.func,
  onFollow: PropTypes.func,
  onUnfollow: PropTypes.func,
};

export default React.memo(UserHeader);