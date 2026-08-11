import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiBell } from "react-icons/fi";
import { useNotifications } from "../hooks/useNotifications";

const NotificationDropdown = () => {
  const dropdownRef = useRef(null);

  const [open, setOpen] = useState(false);

  const {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    refresh
  } = useNotifications();

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    const close = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", close);

    return () =>
      document.removeEventListener(
        "mousedown",
        close
      );
  }, []);

  const openNotification = async (notification) => {
    if (!notification.read) {
      await markAsRead(notification.id);
    }

    setOpen(false);

    switch (notification.entityType) {
      case "post":
        window.location.href =
          `/posts/${notification.entityId}`;
        break;

      case "reel":
        window.location.href =
          `/reels/${notification.entityId}`;
        break;

      case "story":
        window.location.href =
          `/stories/${notification.entityId}`;
        break;

      case "podcast":
        window.location.href =
          `/podcasts/${notification.entityId}`;
        break;

      case "marketplace":
        window.location.href =
          `/marketplace/${notification.entityId}`;
        break;

      default:
        window.location.href =
          "/notifications";
    }
  };

  return (
    <div
      className="relative"
      ref={dropdownRef}
    >
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
      >
        <FiBell
          size={22}
        />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-600 px-1 text-[11px] font-bold text-white">
            {unreadCount > 99
              ? "99+"
              : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-[390px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 z-50">

          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-zinc-800">
            <h3 className="font-semibold">
              Notifications
            </h3>

            <Link
              to="/notifications"
              onClick={() =>
                setOpen(false)
              }
              className="text-sm text-blue-600 hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="max-h-[500px] overflow-y-auto">

            {loading && (
              <div className="p-5 text-center text-sm text-gray-500">
                Loading...
              </div>
            )}

            {!loading &&
              notifications.length === 0 && (
                <div className="p-8 text-center text-sm text-gray-500">
                  No notifications
                </div>
              )}

            {!loading &&
              notifications.map(
                (notification) => (
                  <button
                    key={
                      notification.id
                    }
                    onClick={() =>
                      openNotification(
                        notification
                      )
                    }
                    className={`w-full border-b border-gray-100 px-5 py-4 text-left transition hover:bg-gray-50 dark:border-zinc-800 dark:hover:bg-zinc-800 ${
                      !notification.read
                        ? "bg-blue-50 dark:bg-zinc-800"
                        : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">

                      <div>

                        <h4 className="font-semibold">
                          {
                            notification.title
                          }
                        </h4>

                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                          {
                            notification.message
                          }
                        </p>

                        <span className="mt-2 block text-xs text-gray-400">
                          {new Date(
                            notification.createdAt
                          ).toLocaleString()}
                        </span>

                      </div>

                      {!notification.read && (
                        <span className="mt-1 h-3 w-3 rounded-full bg-blue-600" />
                      )}

                    </div>
                  </button>
                )
              )}

          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;