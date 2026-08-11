import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchUserProfile,
  clearUserError,
} from "../store/userActions";

import {
  selectCurrentUser,
  selectUserLoading,
  selectUserError,
} from "../store/userSelectors";

const useUser = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectCurrentUser);
  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, user]);

  const refresh = () => {
    dispatch(fetchUserProfile());
  };

  const clearError = () => {
    dispatch(clearUserError());
  };

  return {
    user,
    loading,
    error,
    refresh,
    clearError,
  };
};

export default useUser;