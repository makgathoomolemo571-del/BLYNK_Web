// hooks/useWatchPartyChat.js

import { useEffect, useRef, useState } from "react";
import { getSocket } from "../../../config/socket";

const useWatchPartyChat = (partyId) => {

  const socket = getSocket();

  const [messages, setMessages] = useState([]);

  const joined = useRef(false);

  useEffect(() => {

    if (!socket || !partyId) return;

    if (!joined.current) {

      socket.emit(
        "watchparty:chat:join",
        partyId
      );

      joined.current = true;
    }

    socket.on(
      "watchparty:chat:message",
      message => {

        setMessages(prev => [
          ...prev,
          message
        ]);

      }
    );

    return () => {

      socket.emit(
        "watchparty:chat:leave",
        partyId
      );

      socket.off(
        "watchparty:chat:message"
      );

    };

  }, [socket, partyId]);

  const sendMessage = (message) => {

    if (!socket) return;

    socket.emit(
      "watchparty:chat:send",
      {
        partyId,
        message
      }
    );

  };

  return {

    messages,

    sendMessage

  };

};

export default useWatchPartyChat;