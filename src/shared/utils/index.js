// ======================
// DATE UTILITIES
// ======================

export const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString();
};

export const formatDateTime = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleString();
};

export const timeAgo = (date) => {
  if (!date) return "";

  const now = new Date();
  const past = new Date(date);

  const diff = Math.floor((now - past) / 1000);

  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

// ======================
// STRING UTILITIES
// ======================

export const truncate = (text, length = 100) => {
  if (!text) return "";
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
};

export const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// ======================
// NUMBER UTILITIES
// ======================

export const formatNumber = (num) => {
  if (num === null || num === undefined) return 0;

  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";

  return num;
};

// ======================
// VALIDATION HELPERS
// ======================

export const isEmpty = (value) => {
  return (
    value === null ||
    value === undefined ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  );
};

// ======================
// TOKEN HELPERS
// ======================

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

// ======================
// ERROR HANDLER
// ======================

export const getErrorMessage = (error) => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong"
  );
};