import { authService } from "../services/auth.service";

import {

  setCredentials,
  setLoading,
  setError,
  logout as logoutAction

} from "./authSlice";

export const loadCurrentUser = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));

        const token = localStorage.getItem("accessToken");

        if (!token) {
            dispatch(logoutAction());
            return;
        }

        const response = await authAPI.getMe();

        dispatch(
            setCredentials({
                user: response.data,
                token,
                refreshToken: localStorage.getItem("refreshToken"),
            })
        );
    } catch (err) {
        dispatch(logoutAction());
    } finally {
        dispatch(setLoading(false));
    }
};

export const loginUser = (credentials) => async (dispatch) => {

  try {

    dispatch(setLoading(true));

    const response = await authAPI.login(credentials);

    const { accessToken, refreshToken } = response.data;

localStorage.setItem("accessToken", accessToken);
localStorage.setItem("refreshToken", refreshToken);

    dispatch(setCredentials(response.data));

    return response.data;

  } catch (err) {

    dispatch(setError(err?.response?.data?.message || "Login failed"));

    throw err;

  } finally {

    dispatch(setLoading(false));

  }

};

export const registerUser = (data) => async (dispatch) => {

  try {

    dispatch(setLoading(true));

    const response = await authAPI.register(data);

    dispatch(setCredentials(response.data));

    return response.data;

  } catch (err) {

    dispatch(setError(err?.response?.data?.message || "Register failed"));

    throw err;

  } finally {

    dispatch(setLoading(false));

  }

};

export const logoutUser = () => async (dispatch) => {

  try {

    await authAPI.logout();

  } finally {

    dispatch(logoutAction());

  }

};

export const refreshTokenAction = () => async (dispatch) => {

  try {

    const response = await authAPI.refreshToken();

    dispatch(setCredentials(response.data));

    return response.data;

  } catch (err) {

    dispatch(logoutAction());

    throw err;

  }

};