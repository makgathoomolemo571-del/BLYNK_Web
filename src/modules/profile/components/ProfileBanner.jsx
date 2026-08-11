// ProfileBanner.jsx
import React from "react";
import PropTypes from "prop-types";

const ProfileBanner = ({ coverBanner }) => {
  return (
    <div className="w-full h-48 md:h-64 relative bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
      {coverBanner ? (
        <img
          src={coverBanner}
          alt="profile banner"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
      )}
    </div>
  );
};

ProfileBanner.propTypes = {
  coverBanner: PropTypes.string,
};

export default ProfileBanner;