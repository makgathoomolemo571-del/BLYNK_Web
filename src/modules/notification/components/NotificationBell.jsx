// modules/notification/components/NotificationBell.jsx

import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import notificationApi from "../services/notification.api";
import notificationSocket from "../services/notification.socket";

const NotificationBell = () => {
  const navigate = useNavigate();

  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadNotifications = async () => {
    try {
      const notifications = await notificationApi.getMine();

      const unread = notifications.filter(
        (notification) => !notification.read
      ).length;

      setCount(unread);
    } catch (error) {
      console.error("NotificationBell:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();

    notificationSocket.connect();

    notificationSocket.onNotification(() => {
      loadNotifications();
    });

    notificationSocket.onRead(() => {
      loadNotifications();
    });

    return () => {
      notificationSocket.offNotification();
      notificationSocket.offRead();
    };
  }, []);

  const openNotifications = () => {
    navigate("/notifications");
  };

  return (
    <button
      type="button"
      onClick={openNotifications}
      className="relative flex items-center justify-center h-11 w-11 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
    >
      <FaBell
        size={20}
        className="text-zinc-700 dark:text-white"
      />

      {!loading && count > 0 && (
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
            border-2
            border-white
            dark:border-zinc-900
          "
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
};

export default NotificationBell;