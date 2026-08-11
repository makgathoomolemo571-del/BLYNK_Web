import { memo } from "react";
import PropTypes from "prop-types";
import {
  Bell,
  CheckCircle2,
  Heart,
  MessageCircle,
  UserPlus,
  Wallet,
  ShieldCheck,
  Store,
  Podcast,
  PlayCircle,
  AlertTriangle,
} from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";

const ICONS = {
  FOLLOW: UserPlus,
  FRIEND_REQUEST: UserPlus,
  FRIEND_ACCEPTED: CheckCircle2,
  LIKE: Heart,
  COMMENT: MessageCircle,
  REPLY: MessageCircle,
  POST: Bell,
  REEL: PlayCircle,
  STORY: PlayCircle,
  PODCAST: Podcast,
  MARKETPLACE: Store,
  WALLET: Wallet,
  VERIFICATION: ShieldCheck,
  REPORT: AlertTriangle,
  DEFAULT: Bell,
};

function NotificationCard({
  notification,
  onRead,
  onClick,
}) {
  const Icon =
    ICONS[notification.type] ||
    ICONS.DEFAULT;

  const handleClick = () => {
    if (!notification.read && onRead) {
      onRead(notification.id);
    }

    if (onClick) {
      onClick(notification);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        w-full
        cursor-pointer
        rounded-xl
        border
        transition-all
        duration-200
        hover:shadow-md

        ${
          notification.read
            ? "bg-white border-zinc-200"
            : "bg-blue-50 border-blue-300"
        }
      `}
    >
      <div className="flex items-start gap-4 p-4">

        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-blue-100
            text-blue-700
          "
        >
          <Icon size={22} />
        </div>

        <div className="flex-1">

          <div className="flex items-center justify-between">

            <h3 className="font-semibold text-zinc-900">
              {notification.title}
            </h3>

            {!notification.read && (
              <span
                className="
                  h-2.5
                  w-2.5
                  rounded-full
                  bg-blue-600
                "
              />
            )}

          </div>

          <p className="mt-1 text-sm text-zinc-600">
            {notification.message}
          </p>

          {notification.entityType && (
            <span
              className="
                mt-3
                inline-flex
                rounded-full
                bg-zinc-100
                px-3
                py-1
                text-xs
                font-medium
                uppercase
                tracking-wide
                text-zinc-600
              "
            >
              {notification.entityType}
            </span>
          )}

          <p className="mt-3 text-xs text-zinc-500">
            {formatDistanceToNowStrict(
              new Date(notification.createdAt),
              {
                addSuffix: true,
              }
            )}
          </p>

        </div>

      </div>
    </div>
  );
}

NotificationCard.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string,
    message: PropTypes.string,
    entityType: PropTypes.string,
    entityId: PropTypes.string,
    read: PropTypes.bool,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,

  onRead: PropTypes.func,

  onClick: PropTypes.func,
};

export default memo(NotificationCard);