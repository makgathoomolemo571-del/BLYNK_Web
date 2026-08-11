import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import notificationService from "../services/notification.api";

/**
 * useNotificationSocket
 * Real-time notification listener
 */
export const useNotificationSocket = (userId, onNewNotification) => {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    const socket = io(
      import.meta.env.VITE_SOCKET_URL || "http://localhost:3000",
      {
        auth: { userId },
        transports: ["websocket"],
      }
    );

    socketRef.current = socket;

    socket.on("connect", () => {
      // optional: mark delivered
      socket.emit("notification:join", userId);
    });

    socket.on("notification:new", (data) => {
      if (onNewNotification) {
        onNewNotification(data);
      }
    });

    socket.on("disconnect", () => {
      // cleanup handled automatically
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId, onNewNotification]);

  return socketRef;
};