import React, { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";

const DEFAULT_AVATAR =
  "/assets/images/default-avatar.png";

const ROLE_COLORS = {
  member:
    "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-zinc-300",

  creator:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",

  business:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",

  admin:
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",

  superadmin:
    "bg-black text-white"
};

function UserCard({

  user,
  profile,
  onClick

}) {

  if (!user) return null;

  const avatar =
    profile?.profilePicture ||
    DEFAULT_AVATAR;

  const displayName =
    profile?.displayName ||
    user.username;

  const fullName =
    [
      profile?.firstName,
      profile?.lastName
    ]
      .filter(Boolean)
      .join(" ");

  const badgeClass =
    ROLE_COLORS[user.role] ||
    ROLE_COLORS.member;

  return (

    <Link
      to={`/profile/${user.id}`}
      onClick={onClick}
      className="block rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition hover:shadow-lg hover:border-blue-500 overflow-hidden"
    >

      <div className="p-5">

        <div className="flex items-start gap-4">

          <img
            src={avatar}
            alt={displayName}
            loading="lazy"
            className="w-20 h-20 rounded-full object-cover border border-zinc-300 dark:border-zinc-700"
          />

          <div className="flex-1 min-w-0">

            <div className="flex items-center gap-2">

              <h3 className="font-semibold text-lg truncate text-zinc-900 dark:text-white">

                {displayName}

              </h3>

              {user.verified && (

                <MdVerified
                  size={20}
                  className="text-blue-500 flex-shrink-0"
                />

              )}

            </div>

            {fullName && (

              <p className="text-sm text-zinc-500 truncate">

                {fullName}

              </p>

            )}

            <p className="text-sm text-zinc-500 truncate">

              @{user.username}

            </p>

            <div className="mt-3 flex items-center gap-2 flex-wrap">

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${badgeClass}`}
              >

                {user.role}

              </span>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                  user.status === "active"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                    : user.status === "suspended"
                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                }`}
              >

                {user.status}

              </span>

            </div>

          </div>

          {(user.role === "admin" ||
            user.role === "superadmin") && (

            <FaUserShield
              className="text-red-500"
              size={18}
            />

          )}

        </div>

        {profile?.bio && (

          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300 line-clamp-3">

            {profile.bio}

          </p>

        )}

        <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">

          <span>

            Joined{" "}
            {new Date(
              user.createdAt
            ).toLocaleDateString()}

          </span>

          {profile?.location && (

            <span className="truncate max-w-[140px]">

              {profile.location}

            </span>

          )}

        </div>

      </div>

    </Link>

  );

}

UserCard.propTypes = {

  user: PropTypes.shape({

    id: PropTypes.string.isRequired,

    username: PropTypes.string.isRequired,

    email: PropTypes.string,

    role: PropTypes.string.isRequired,

    verified: PropTypes.bool,

    status: PropTypes.string,

    createdAt: PropTypes.string

  }).isRequired,

  profile: PropTypes.shape({

    displayName: PropTypes.string,

    firstName: PropTypes.string,

    lastName: PropTypes.string,

    bio: PropTypes.string,

    profilePicture: PropTypes.string,

    coverBanner: PropTypes.string,

    location: PropTypes.string

  }),

  onClick: PropTypes.func

};

export default memo(UserCard);