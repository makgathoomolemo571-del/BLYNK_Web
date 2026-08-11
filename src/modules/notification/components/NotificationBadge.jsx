import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";

import notificationApi from "../services/notification.api";

const NotificationBadge = () => {

  const [unread, setUnread] = useState(0);

  const loadUnread = async () => {
    try {

      const notifications =
        await notificationApi.getMine();

      const count =
        notifications.filter(
          (item) => !item.read
        ).length;

      setUnread(count);

    } catch (error) {

      console.error(
        "NotificationBadge:",
        error
      );

    }
  };

  useEffect(() => {

    loadUnread();

    const interval =
      setInterval(loadUnread, 30000);

    return () =>
      clearInterval(interval);

  }, []);

  return (

    <Link
      to="/notifications"
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
    >

      <FaBell
        className="text-xl text-gray-700 dark:text-white"
      />

      {
        unread > 0 && (

          <span
            className="
            absolute
            -top-1
            -right-1
            min-w-[20px]
            h-5
            px-1
            rounded-full
            bg-red-600
            text-white
            text-[11px]
            font-bold
            flex
            items-center
            justify-center
            shadow
            "
          >

            {unread > 99
              ? "99+"
              : unread}

          </span>

        )
      }

    </Link>

  );

};

export default NotificationBadge;