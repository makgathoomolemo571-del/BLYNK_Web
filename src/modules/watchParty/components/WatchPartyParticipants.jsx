import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { FaUserCircle } from "react-icons/fa";

const WatchPartyParticipants = ({
  participants = [],
  creator,
  viewerCount = 0,
  maxVisible = 8,
  onParticipantClick
}) => {

  const uniqueParticipants = useMemo(() => {

    const map = new Map();

    participants.forEach((user) => {

      if (!user) return;

      const id = user.id || user._id;

      if (!id) return;

      if (!map.has(id)) {
        map.set(id, user);
      }

    });

    return [...map.values()];

  }, [participants]);

  const visibleParticipants =
    uniqueParticipants.slice(0, maxVisible);

  const remaining =
    uniqueParticipants.length - visibleParticipants.length;

  return (
    <div className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">

      <div className="flex items-center justify-between mb-4">

        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
          Participants
        </h3>

        <span className="text-xs text-zinc-500">
          {viewerCount.toLocaleString()} watching
        </span>

      </div>

      <div className="flex flex-wrap gap-3">

        {creator && (

          <button
            type="button"
            onClick={() =>
              onParticipantClick?.(creator)
            }
            className="flex flex-col items-center gap-2"
          >

            {creator.profilePicture ? (

              <img
                src={creator.profilePicture}
                alt={creator.username}
                className="w-14 h-14 rounded-full object-cover border-2 border-blue-600"
              />

            ) : (

              <FaUserCircle
                className="w-14 h-14 text-blue-600"
              />

            )}

            <span className="text-xs font-semibold text-blue-600">
              Host
            </span>

          </button>

        )}

        {visibleParticipants.map((user) => (

          <button
            key={user.id || user._id}
            type="button"
            onClick={() =>
              onParticipantClick?.(user)
            }
            className="flex flex-col items-center gap-2"
          >

            {user.profilePicture ? (

              <img
                src={user.profilePicture}
                alt={user.username}
                className="w-14 h-14 rounded-full object-cover border border-zinc-300 dark:border-zinc-700"
              />

            ) : (

              <FaUserCircle
                className="w-14 h-14 text-zinc-500"
              />

            )}

            <span
              className="text-xs text-center max-w-[70px] truncate text-zinc-700 dark:text-zinc-300"
            >
              {user.displayName || user.username}
            </span>

          </button>

        ))}

        {remaining > 0 && (

          <div className="flex flex-col items-center justify-center w-14 h-14 rounded-full bg-zinc-100 dark:bg-zinc-800">

            <span className="font-bold text-sm">
              +{remaining}
            </span>

          </div>

        )}

      </div>

    </div>
  );

};

WatchPartyParticipants.propTypes = {

  creator: PropTypes.object,

  viewerCount: PropTypes.number,

  maxVisible: PropTypes.number,

  participants: PropTypes.arrayOf(
    PropTypes.shape({

      id: PropTypes.string,

      _id: PropTypes.string,

      username: PropTypes.string,

      displayName: PropTypes.string,

      profilePicture: PropTypes.string

    })
  ),

  onParticipantClick: PropTypes.func

};

export default React.memo(
  WatchPartyParticipants
);