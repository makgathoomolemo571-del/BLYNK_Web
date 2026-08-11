import { useEffect, useState } from "react";

export default function useIntersection(

  ref,

  options = {}

) {

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {

    const observer = new IntersectionObserver(

      ([entry]) => {

        setIsVisible(entry.isIntersecting);

      },

      options

    );

    if (ref.current) {

      observer.observe(ref.current);

    }

    return () => observer.disconnect();

  }, [

    ref,

    options

  ]);

  return isVisible;

}