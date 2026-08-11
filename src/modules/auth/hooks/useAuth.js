import { useEffect, useState, useCallback } from "react";
import authService from "../services/auth.service";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  clearUser,
  setLoading,
  setAuthenticated
} from "../store/authSlice";

import { selectUser, selectIsAuthenticated } from "../store/authSelectors";

const useAuth = () => {

  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [initializing, setInitializing] = useState(true);

  // ======================
  // INIT AUTH ON LOAD
  // ======================
  const initAuth = useCallback(async () => {

    try {

      dispatch(setLoading(true));

      const token = authService.getAccessToken()();

      if (!token) {
        dispatch(clearUser());
        setInitializing(false);
        return;
      }

      const res = await authService.getMe();

      dispatch(setUser(res.data));
      dispatch(setAuthenticated(true));

    } catch (err) {

      authService.clearSession();

      dispatch(clearUser());

    } finally {
      dispatch(setLoading(false));
      setInitializing(false);
    }

  }, [dispatch]);

  // ======================
  // LOGIN
  // ======================
  const login = async (credentials) => {

    dispatch(setLoading(true));

    try {

      const res = await authService.login(credentials);

      authService.saveSession(res.data);

      dispatch(setUser(res.data.user));
      dispatch(setAuthenticated(true));

      return res.data;

    } finally {
      dispatch(setLoading(false));
    }

  };

  // ======================
  // REGISTER
  // ======================
  const register = async (data) => {

    dispatch(setLoading(true));

    try {

      const res = await authService.register(data);

      return res.data;

    } finally {
      dispatch(setLoading(false));
    }

  };

  // ======================
  // LOGOUT
  // ======================
  const logout = async () => {

    try {

      await authService.logout();

    } finally {

      authService.clearSession();

      dispatch(clearUser());
      dispatch(setAuthenticated(false));

    }

  };

  // ======================
  // REFRESH TOKEN
  // ======================
  const refreshSession = async () => {

    try {

      const res = await authService.refreshToken();

      authService.saveToken(res.data.accessToken);

      return res.data;

    } catch (err) {

      logout();

    }

  };

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return {

    user,
    isAuthenticated,
    initializing,

    login,
    register,
    logout,
    refreshSession

  };

};

export default useAuth;