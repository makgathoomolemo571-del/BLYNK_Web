// src/modules/messages/components/SeenAvatar.jsx

import PropTypes from "prop-types";

const MAX_VISIBLE = 5;

export default function SeenAvatar({
  users = [],
  size = 28
}) {
  if (!users.length) return null;

  const visible = users.slice(0, MAX_VISIBLE);
  const remaining = users.length - visible.length;

  return (
    <div className="flex items-center -space-x-2">

      {visible.map((user) => (

        <img
          key={user._id}
          src={
            user.profilePicture ||
            "/images/avatar.png"
          }
          alt={user.displayName || user.username}
          title={user.displayName || user.username}
          className="rounded-full border-2 border-white object-cover bg-zinc-200"
          style={{
            width: size,
            height: size
          }}
        />

      ))}

      {remaining > 0 && (

        <div
          className="rounded-full border-2 border-white bg-zinc-700 text-white flex items-center justify-center font-semibold"
          style={{
            width: size,
            height: size,
            fontSize: size * 0.42
          }}
        >
          +{remaining}
        </div>

      )}

    </div>
  );
}

SeenAvatar.propTypes = {
  users: PropTypes.array,
  size: PropTypes.number
};