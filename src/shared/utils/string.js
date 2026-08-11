export const capitalize = (str = "") => {

  return str.charAt(0).toUpperCase() + str.slice(1);

};

export const truncate = (str = "", length = 100) => {

  if (str.length <= length) return str;

  return str.slice(0, length) + "...";

};

export const generateUsername = (name = "") => {

  return name
    .toLowerCase()
    .replace(/\s/g, "_")
    + "_" +
    Math.floor(Math.random() * 9999);

};

export const formatNumber = (num = 0) => {

  if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";

  if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";

  return num;

};

export const isEmpty = (str) => {

  return !str || str.trim().length === 0;

};