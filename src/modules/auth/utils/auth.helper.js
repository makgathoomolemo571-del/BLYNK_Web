const ACCESS_TOKEN_KEY = "blynk_access_token";
const REFRESH_TOKEN_KEY = "blynk_refresh_token";
const USER_KEY = "blynk_user";

// =========================
// TOKEN STORAGE
// =========================

export const setTokens = ({ accessToken, refreshToken }) => {
  if (!accessToken || !refreshToken) return;

  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

// =========================
// USER STORAGE
// =========================

export const setUser = (user) => {
  if (!user) return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const clearUser = () => {
  localStorage.removeItem(USER_KEY);
};

// =========================
// SESSION CONTROL
// =========================

export const isAuthenticated = () => {
  const token = getAccessToken();
  return !!token;
};

export const logoutLocal = () => {
  clearTokens();
  clearUser();
};

// =========================
// TOKEN EXPIRY CHECK (JWT SAFE)
// =========================

export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Date.now() / 1000;

    return payload.exp < now;
  } catch (err) {
    return true;
  }
};

// =========================
// ROLE CHECK (for frontend guards)
// =========================

export const hasRole = (user, role) => {
  if (!user || !role) return false;
  return user.role === role;
};

// =========================
// PERMISSION CHECK
// =========================

export const hasPermission = (user, permission) => {
  if (!user || !user.permissions) return false;
  return user.permissions.includes(permission);
};