import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  FaHeart,
  FaRegHeart,
  FaCommentDots,
  FaShare,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";

const ReelActions = ({
  reel,
  onLike,
  onComment,
  onShare,
  onSave,
  userId,
}) => {
  const [liked, setLiked] = useState(
    reel?.isLiked || false
);

const [saved, setSaved] = useState(
    reel?.isSaved || false
);

  const handleLike = async () => {
    setLiked((prev) => !prev);
    if (onLike) onLike(reel?.id);
  };

  const handleSave = async () => {
    setSaved((prev) => !prev);
    if (onSave) onSave(reel?.id);
  };

 const likeCount = reel?.stats?.likes || 0;
const commentCount = reel?.stats?.comments || 0;
const shareCount = reel?.stats?.shares || 0;

  return (
    <div className="flex flex-col items-center gap-4 text-white">
      {/* Like */}
      <button
        onClick={handleLike}
        className="flex flex-col items-center gap-1"
      >
        {liked ? (
          <FaHeart className="text-red-500 text-2xl" />
        ) : (
          <FaRegHeart className="text-2xl" />
        )}
        <span className="text-xs">{likeCount}</span>
      </button>

      {/* Comment */}
      <button
        onClick={() => onComment?.(reel?.id)}
        className="flex flex-col items-center gap-1"
      >
        <FaCommentDots className="text-2xl" />
        <span className="text-xs">{commentCount}</span>
      </button>

      {/* Share */}
      <button
        onClick={() => onShare?.(reel?.id)}
        className="flex flex-col items-center gap-1"
      >
        <FaShare className="text-2xl" />
        <span className="text-xs">{shareCount}</span>
      </button>

      {/* Save */}
      <button
        onClick={handleSave}
        className="flex flex-col items-center gap-1"
      >
        {saved ? (
          <FaBookmark className="text-yellow-400 text-2xl" />
        ) : (
          <FaRegBookmark className="text-2xl" />
        )}
        <span className="text-xs">Save</span>
      </button>
    </div>
  );
};

ReelActions.propTypes = {
  reel: PropTypes.object.isRequired,
  onLike: PropTypes.func,
  onComment: PropTypes.func,
  onShare: PropTypes.func,
  onSave: PropTypes.func,
  userId: PropTypes.string,
};

export default React.memo(ReelActions);