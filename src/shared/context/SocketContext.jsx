import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../AuthContext";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

  const { token } = useAuth();
  const socketRef = useRef(null);

  useEffect(() => {

    if (!token) return;

    socketRef.current = io("http://localhost:3000", {
      auth: { token },
      transports: ["websocket"]
    });

    return () => {
      socketRef.current?.disconnect();
    };

  }, [token]);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);