import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    selectStories,
    selectStoryLoading,
    selectStoryError
} from "../store/storySelectors";

export const useStories = () => {
  const dispatch = useDispatch();

  const stories = useSelector(selectStories);
  const loading = useSelector(selectStoryLoading);
  const error = useSelector(selectStoryError);

  useEffect(() => {
    dispatch(fetchStories());
  }, [dispatch]);

  return {
    stories,
    loading,
    error
  };
};