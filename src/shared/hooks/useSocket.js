import { useEffect, useState } from "react";

import {

connectSocket,

getSocket

} from "../../config/socket";

export default function useSocket(token) {

  const [socket, setSocket] =
    useState(null);

  useEffect(() => {

    if (!token) return;

    const instance =
      connectSocket(token);

    setSocket(instance);

    return () => {

      instance.disconnect();

    };

  }, [token]);

  const emit = (event, payload) => {

    socket?.emit(event, payload);

  };

  const on = (event, callback) => {

    socket?.on(event, callback);

  };

  const off = (event) => {

    socket?.off(event);

  };

  return {

    socket,

    emit,

    on,

    off,

    getSocket

  };

}