import React, { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import {
  FaBell,
  FaHeart,
  FaUserPlus,
  FaCommentDots,
  FaShareAlt,
  FaPodcast,
  FaVideo,
  FaShoppingBag,
  FaCheckCircle,
  FaInfoCircle
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import notificationApi from "../services/notification.api";

const ICONS = {
  LIKE: <FaHeart />,
  COMMENT: <FaCommentDots />,
  FOLLOW: <FaUserPlus />,
  SHARE: <FaShareAlt />,
  PODCAST: <FaPodcast />,
  REEL: <FaVideo />,
  MARKETPLACE: <FaShoppingBag />,
  SYSTEM: <FaInfoCircle />,
  VERIFIED: <FaCheckCircle />,
  DEFAULT: <FaBell />
};

const NotificationItem = ({
  notification,
  onRead
}) => {

  const navigate = useNavigate();

  const markAsRead = useCallback(async () => {

    if (!notification.read) {

      try {

        await notificationApi.markAsRead(
          notification.id
        );

        onRead?.(notification.id);

      } catch (err) {

        console.error(err);

      }

    }

  }, [notification, onRead]);

  const openNotification = useCallback(async () => {

    await markAsRead();

    switch (notification.entityType) {

      case "POST":
        navigate(`/posts/${notification.entityId}`);
        break;

      case "REEL":
        navigate(`/reels/${notification.entityId}`);
        break;

      case "STORY":
        navigate(`/stories/${notification.entityId}`);
        break;

      case "PODCAST":
        navigate(`/podcasts/${notification.entityId}`);
        break;

      case "WATCH_PARTY":
        navigate(`/watch-parties/${notification.entityId}`);
        break;

      case "MARKETPLACE":
        navigate(`/marketplace/${notification.entityId}`);
        break;

      case "PROFILE":
        navigate(`/profile/${notification.entityId}`);
        break;

      default:
        break;

    }

  }, [notification, markAsRead, navigate]);

  return (

    <div

      onClick={openNotification}

      className={`
        w-full
        flex
        gap-4
        items-start
        rounded-xl
        border
        cursor-pointer
        transition-all
        duration-200
        p-4

        ${
          notification.read
            ? "bg-white border-zinc-200 hover:bg-zinc-50"
            : "bg-blue-50 border-blue-200 hover:bg-blue-100"
        }

      `}
    >

      <div
        className="
          w-11
          h-11
          rounded-full
          flex
          items-center
          justify-center
          bg-blue-600
          text-white
          text-lg
        "
      >

        {
          ICONS[notification.type] ||
          ICONS.DEFAULT
        }

      </div>

      <div className="flex-1">

        <h4
          className="
            font-semibold
            text-zinc-900
          "
        >

          {notification.title}

        </h4>

        <p
          className="
            text-sm
            text-zinc-600
            mt-1
          "
        >

          {notification.message}

        </p>

        <small
          className="
            text-xs
            text-zinc-500
            mt-2
            block
          "
        >

          {

            formatDistanceToNow(
              new Date(
                notification.createdAt
              ),
              {
                addSuffix: true
              }
            )

          }

        </small>

      </div>

      {

        !notification.read && (

          <div
            className="
              w-3
              h-3
              rounded-full
              bg-blue-600
              mt-2
            "
          />

        )

      }

    </div>

  );

};

NotificationItem.propTypes = {

  notification: PropTypes.shape({

    id: PropTypes.string.isRequired,

    type: PropTypes.string.isRequired,

    title: PropTypes.string,

    message: PropTypes.string,

    entityType: PropTypes.string,

    entityId: PropTypes.string,

    read: PropTypes.bool,

    createdAt: PropTypes.string.isRequired

  }).isRequired,

  onRead: PropTypes.func

};

export default memo(NotificationItem);