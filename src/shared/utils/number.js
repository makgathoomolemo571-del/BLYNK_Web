export const formatNumber = (num) => {
  if (num === null || num === undefined) return 0;
  return new Intl.NumberFormat().format(num);
};

export const clamp = (num, min, max) => {
  return Math.min(Math.max(num, min), max);
};

export const toPercentage = (value, total) => {
  if (!total) return 0;
  return ((value / total) * 100).toFixed(2);
};

export const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};