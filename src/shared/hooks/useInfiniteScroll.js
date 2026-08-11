import { useEffect } from "react";

export default function useInfiniteScroll(

  targetRef,

  callback,

  enabled = true

) {

  useEffect(() => {

    if (!enabled) return;

    const observer = new IntersectionObserver(

      ([entry]) => {

        if (entry.isIntersecting) {

          callback();

        }

      },

      {

        threshold: 1

      }

    );

    if (targetRef.current) {

      observer.observe(targetRef.current);

    }

    return () => observer.disconnect();

  }, [

    targetRef,

    callback,

    enabled

  ]);

}