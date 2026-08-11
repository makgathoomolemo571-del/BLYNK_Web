import { io } from "socket.io-client";

let socket = null;

export const connectNotificationSocket = (token) => {
  socket = io(import.meta.env.VITE_SOCKET_URL, {
    auth: { token },
    transports: ["websocket"],
  });

  return socket;
};

export const getNotificationSocket = () => socket;

export const disconnectNotificationSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const subscribeToNotifications = (callback) => {
  if (!socket) return;

  socket.on("notification:new", (data) => {
    callback(data);
  });
};

export const unsubscribeFromNotifications = () => {
  if (!socket) return;

  socket.off("notification:new");
};