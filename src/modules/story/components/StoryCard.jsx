import React, { useMemo } from "react";
import PropTypes from "prop-types";
import {
  FaHeart,
  FaRegHeart,
  FaReply,
  FaEye,
  FaEllipsisH,
} from "react-icons/fa";

const StoryCard = ({
  story,
  currentUserId,
  onView,
  onReact,
  onReply,
  onOpen,
}) => {
  const hasReacted = useMemo(() => {
    return story?.reactions?.some(
      (r) => r.userId === currentUserId
    );
  }, [story, currentUserId]);

  const isExpired = useMemo(() => {
    return new Date(story?.expiresAt) < new Date();
  }, [story]);

  if (!story || isExpired) return null;

  return (
    <div
    className="relative w-28 h-40 rounded-xl overflow-hidden bg-black shadow-md group cursor-pointer"
    onClick={() => onOpen(story.id || story._id)}
>
      
      {/* MEDIA */}
      <div
        className="absolute inset-0 cursor-pointer"
        
      >
        {story.type === "image" && (
         <img
    src={story.media?.[0]?.url}
    alt="story"
    className="w-full h-full object-cover"
/>
        )}

        {story.type === "video" && (
          <video
    src={story.media?.[0]?.url}
    className="w-full h-full object-cover"
    muted
    autoPlay
    loop
/>
        )}

        {story.type === "text" && (
          <div className="w-full h-full flex items-center justify-center p-2 text-white text-xs text-center bg-gradient-to-br from-purple-600 to-blue-600">
            {story.caption}
          </div>
        )}
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      {/* USER INFO */}
      <div className="absolute bottom-2 left-2 right-2 text-white">
        <p className="text-xs font-semibold truncate">
          {story?.creator?.username}
        </p>
        <p className="text-[10px] text-gray-300">
          {new Date(story.createdAt).toLocaleTimeString()}
        </p>
      </div>

      {/* ACTIONS */}
    <div className="absolute top-2 right-2 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition">

 

  <button
    onClick={() => onView?.(story.id)}
    className="flex flex-col items-center text-white text-sm"
  >
    <FaEye size={18}/>
    <span className="text-[10px] mt-1">
      {story.stats?.views ?? 0}
    </span>
  </button>

  <button className="text-white text-sm">
    <FaEllipsisH size={18}/>
  </button>

</div>
    </div>
  );
};

StoryCard.propTypes = {
  story: PropTypes.object.isRequired,
  currentUserId: PropTypes.string,
  onView: PropTypes.func,
  onReact: PropTypes.func,
  onReply: PropTypes.func,
  onOpen: PropTypes.func,
};

export default StoryCard;