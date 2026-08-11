// hooks/useWatchPartySocket.js

import { useEffect, useState } from "react";
import { getSocket } from "../../../config/socket";

const useWatchPartySocket = (partyId) => {

  const socket = getSocket();

  const [viewerCount, setViewerCount] =
    useState(0);

  const [status, setStatus] =
    useState("scheduled");

  useEffect(() => {

    if (!socket || !partyId) return;

    socket.emit(
      "watchparty:join",
      partyId
    );

    socket.on(
      "watchparty:update",
      payload => {

        if (
          payload.id !== partyId
        ) return;

        setViewerCount(
          payload.viewerCount
        );

        setStatus(
          payload.status
        );

      }
    );

    return () => {

      socket.emit(
        "watchparty:leave",
        partyId
      );

      socket.off(
        "watchparty:update"
      );

    };

  }, [socket, partyId]);

  return {

    viewerCount,

    status,

    isLive:
      status === "live"

  };

};

export default useWatchPartySocket;