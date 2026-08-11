import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Heart,
  MessageCircle,
  Repeat2,
  Bookmark,
  Eye,
  MoreHorizontal,
  CheckCircle2
} from "lucide-react";

import { Link } from "react-router-dom";

const formatNumber = (value = 0) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value;
};

const formatTime = (date) => {
  const diff =
    Math.floor((Date.now() - new Date(date)) / 1000);

  if (diff < 60) return `${diff}s`;

  if (diff < 3600)
    return `${Math.floor(diff / 60)}m`;

  if (diff < 86400)
    return `${Math.floor(diff / 3600)}h`;

  if (diff < 604800)
    return `${Math.floor(diff / 86400)}d`;

  return new Date(date).toLocaleDateString();
};

const PostCard = ({
  post,
  onLike = () => {},
  onComment = () => {},
  onShare = () => {},
  onSave = () => {},
  onMenu = () => {},
}) => {

  const media = useMemo(() => {
    return post.media || [];
  }, [post.media]);

  const firstMedia = media[0];

  return (

    <article className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-sm">



      {/* HEADER */}

      <div className="flex items-center justify-between px-5 py-4">

        <div className="flex items-center gap-3">

          <Link
            to={`/profile/${post.creator?.id}`}
          >

            <img
              src={
                post.creator?.profilePicture ||
                "/images/default-avatar.png"
              }
              alt=""
              className="w-12 h-12 rounded-full object-cover"
            />

          </Link>

          <div>

            <div className="flex items-center gap-1">

              <Link
                to={`/profile/${post.creator?.id}`}
                className="font-semibold hover:underline"
              >
                {post.creator?.username}
              </Link>

              <CheckCircle2
                size={16}
                className="text-blue-500"
              />

            </div>

            <div className="text-xs text-zinc-500">

              {formatTime(post.createdAt)}

            </div>

          </div>

        </div>

        <button
    onClick={(e)=>{

        e.stopPropagation();

        console.log("MENU CLICKED", post);

        onMenu(post);

    }}
    className="p-2 rounded-full hover:bg-gray-100"
>
    ⋮
</button>

      </div>

      {/* CAPTION */}

      {post.caption && (

        <div className="px-5 pb-4 whitespace-pre-wrap">

          {post.caption}

        </div>

      )}

      {post.sharedPost && (

<div className="mx-5 mb-4 border rounded-xl overflow-hidden bg-gray-50">

<div className="p-4 text-sm text-gray-500">

🔄 {post.creator?.username} reposted

</div>


<div className="p-4">

<div className="font-semibold">

{post.sharedPost.creator?.username}

</div>


<p className="mt-2">

{post.sharedPost.caption}

</p>


{post.sharedPost.media?.length > 0 && (

<img
src={post.sharedPost.media[0].url}
className="w-full mt-3 rounded-xl"
/>

)}


</div>

</div>

)}

      {/* MEDIA */}

      {firstMedia && (

        <div>

          {firstMedia.type === "image" && (

            <img
              src={firstMedia.url}
              alt=""
              className="w-full max-h-[700px] object-cover"
            />

          )}

          {firstMedia.type === "video" && (

            <video
              controls
              preload="metadata"
              className="w-full"
            >

              <source
                src={firstMedia.url}
              />

            </video>

          )}

          {firstMedia.type === "audio" && (

            <audio
              controls
              className="w-full p-4"
            >
              <source
                src={firstMedia.url}
              />
            </audio>

          )}

        </div>

      )}

      {/* ACTIONS */}

      <div className="flex justify-between px-5 py-4 border-t border-zinc-200 dark:border-zinc-800">

        <button
          onClick={() => onLike?.(post.id)}
          className="flex items-center gap-2"
        >
          <Heart
    size={20}
    fill={post.liked ? "currentColor" : "none"}
    className={
        post.liked
            ? "text-red-500"
            : ""
    }
/>

          {formatNumber(
            post.stats.likes
          )}

        </button>

        <button
          onClick={() => onComment?.(post.id)}
          className="flex items-center gap-2"
        >

          <MessageCircle size={20} />

          {formatNumber(
            post.stats.comments
          )}

        </button>

        <button
          onClick={() => onShare?.(post.id)}
          className="flex items-center gap-2"
        >

          <Repeat2 size={20} />

          {formatNumber(
            post.stats.shares
          )}

        </button>

        <button
          onClick={() => onSave?.(post.id)}
          className="flex items-center gap-2"
        >

          <Bookmark size={20} />

          {formatNumber(
            post.stats.saves
          )}

        </button>

        <div
          className="flex items-center gap-2 text-zinc-500"
        >

          <Eye size={18} />

          {formatNumber(
            post.stats.views
          )}

        </div>

      </div>

    </article>

  );

};

PostCard.propTypes = {

  post: PropTypes.shape({

    id: PropTypes.string.isRequired,

    creator: PropTypes.shape({

      id: PropTypes.string,

      username: PropTypes.string,

      profilePicture:
        PropTypes.string

    }),

    caption: PropTypes.string,

    media: PropTypes.array,

    createdAt: PropTypes.string,

    stats: PropTypes.shape({

      likes: PropTypes.number,

      comments: PropTypes.number,

      shares: PropTypes.number,

      saves: PropTypes.number,

      views: PropTypes.number

    })

  }).isRequired,

  onLike: PropTypes.func,

  onComment: PropTypes.func,

  onShare: PropTypes.func,

  onSave: PropTypes.func,

  onMenu: PropTypes.func

};

PostCard.defaultProps = {

  onLike: () => {},

  onComment: () => {},

  onShare: () => {},

  onSave: () => {},

  onMenu: () => {}

};

export default memo(PostCard);