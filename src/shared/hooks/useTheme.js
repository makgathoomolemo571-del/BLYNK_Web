import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {

  setTheme,
  toggleTheme

} from "../../store/themeSlice";

const useTheme = () => {

  const dispatch = useDispatch();

  const theme = useSelector(
    state => state.theme.mode
  );

  useEffect(() => {

    document.documentElement.setAttribute(
      "data-theme",
      theme
    );

  }, [theme]);

  return {

    theme,

    setTheme: (mode) =>
      dispatch(setTheme(mode)),

    toggleTheme: () =>
      dispatch(toggleTheme())

  };

};

export default useTheme;