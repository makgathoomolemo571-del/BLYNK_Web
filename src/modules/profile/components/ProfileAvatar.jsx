import React from "react";
import PropTypes from "prop-types";

const ProfileAvatar = ({
  src,
  username,
  size = 96,
  isVerified = false,
}) => {
  const fallback =
    `https://ui-avatars.com/api/?name=${username}&background=random&color=fff`;

 return (
  <div
    className="relative rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800"
    style={{
      width: size,
      height: size,
    }}
  >
    <img
      src={src || fallback}
      alt={username}
      className="w-full h-full object-cover"
    />

    {isVerified && (
      <span className="absolute bottom-1 right-1 bg-blue-500 text-white text-xs rounded-full px-1">
        ✔
      </span>
    )}
  </div>
);
};

ProfileAvatar.propTypes = {
  src: PropTypes.string,
  username: PropTypes.string.isRequired,
  size: PropTypes.number,
  isVerified: PropTypes.bool,
};

export default React.memo(ProfileAvatar);