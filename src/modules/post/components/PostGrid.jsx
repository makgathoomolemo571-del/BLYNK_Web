import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaCommentDots,
  FaShare,
  FaBookmark,
  FaEye,
} from "react-icons/fa";

import "./PostGrid.css";

const MEDIA_BASE =
  import.meta.env.VITE_MEDIA_URL || "";

const formatNumber = (value = 0) => {
  if (value >= 1000000)
    return `${(value / 1000000).toFixed(1)}M`;

  if (value >= 1000)
    return `${(value / 1000).toFixed(1)}K`;

  return value.toString();
};

const mediaPreview = (media = []) => {
  if (!media.length)
    return "/images/post-placeholder.png";

  const file = media[0];

  if (file.thumbnail)
    return MEDIA_BASE + file.thumbnail;

  return MEDIA_BASE + file.url;
};

const creatorAvatar = (creator) => {
  if (!creator) return "/images/avatar.png";

  return creator.profilePicture
    ? MEDIA_BASE + creator.profilePicture
    : "/images/avatar.png";
};

const PostGrid = ({ posts = [] }) => {
  const navigate = useNavigate();

  return (
    <section className="post-grid">

      {posts.map((post) => (

        <article
          key={post.id}
          className="post-grid-card"
          onClick={() => navigate(`/posts/${post.id}`)}
        >

          <div className="post-grid-image">

            {post.media?.length > 0 ? (

              post.media[0].type === "video" ? (

                <video
                  muted
                  preload="metadata"
                  poster={mediaPreview(post.media)}
                >
                  <source
                    src={
                      MEDIA_BASE +
                      post.media[0].url
                    }
                  />
                </video>

              ) : (

                <img
                  src={mediaPreview(post.media)}
                  alt={post.caption}
                  loading="lazy"
                />

              )

            ) : (

              <div className="post-grid-no-media">
                No Media
              </div>

            )}

          </div>

          <div className="post-grid-content">

            <div className="post-grid-user">

              <img
                src={creatorAvatar(post.creator)}
                alt={post.creator?.username}
              />

              <span>
                {post.creator?.username}
              </span>

            </div>

            <p className="post-grid-caption">
              {post.caption}
            </p>

            <div className="post-grid-footer">

              <span>
                <FaHeart />
                {formatNumber(
                  post.stats.likes
                )}
              </span>

              <span>
                <FaCommentDots />
                {formatNumber(
                  post.stats.comments
                )}
              </span>

              <span>
                <FaShare />
                {formatNumber(
                  post.stats.shares
                )}
              </span>

              <span>
                <FaBookmark />
                {formatNumber(
                  post.stats.saves
                )}
              </span>

              <span>
                <FaEye />
                {formatNumber(
                  post.stats.views
                )}
              </span>

            </div>

          </div>

        </article>

      ))}

    </section>
  );
};

PostGrid.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,

      creator: PropTypes.shape({
        id: PropTypes.string,
        username: PropTypes.string,
        profilePicture:
          PropTypes.string,
      }),

      caption: PropTypes.string,

      media: PropTypes.array,

      visibility:
        PropTypes.string,

      stats: PropTypes.shape({
        likes: PropTypes.number,
        comments:
          PropTypes.number,
        shares: PropTypes.number,
        saves: PropTypes.number,
        views: PropTypes.number,
      }),

      createdAt:
        PropTypes.string,
    })
  ),
};

export default React.memo(PostGrid);