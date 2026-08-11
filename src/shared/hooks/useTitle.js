import { useEffect } from "react";

const useTitle = (title) => {

  useEffect(() => {

    document.title =
      title
        ? `${title} | BLYNK`
        : "BLYNK";

  }, [title]);

};

export default useTitle;