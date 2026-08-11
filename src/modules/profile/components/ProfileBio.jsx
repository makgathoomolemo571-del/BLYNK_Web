import React from "react";
import PropTypes from "prop-types";

const ProfileBio = ({
  displayName,
  bio,
  location,
  website,
}) => {
  return (
    <div className="p-6 space-y-3">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
        {displayName}
      </h2>

      {bio && (
        <p className="text-zinc-600 dark:text-zinc-300">
          {bio}
        </p>
      )}

      {location && (
        <p className="text-sm text-zinc-500">
          📍 {[
            location?.city,
            location?.province,
            location?.country,
          ]
            .filter(Boolean)
            .join(", ")}
        </p>
      )}

      {website && (
        <a
          href={website}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:underline"
        >
          {website}
        </a>
      )}
    </div>
  );
};

ProfileBio.propTypes = {
  displayName: PropTypes.string,
  bio: PropTypes.string,
  location: PropTypes.object,
  website: PropTypes.string,
};

export default ProfileBio;