import { useRef } from "react";

const useThrottle = (callback, delay = 500) => {

  const waiting = useRef(false);

  return (...args) => {

    if (waiting.current) return;

    callback(...args);

    waiting.current = true;

    setTimeout(() => {

      waiting.current = false;

    }, delay);

  };

};

export default useThrottle;