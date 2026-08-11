export const getImageUrl = (path) => {
  if (!path) return null;
  return `${import.meta.env.VITE_API_URL}/${path}`;
};

export const getThumbnail = (videoUrl) => {
  if (!videoUrl) return null;
  return videoUrl.replace(".mp4", ".jpg");
};

export const optimizeImage = (url, size = 300) => {
  return `${url}?w=${size}&q=80`;
};

export const isValidImageUrl = (url) => {
  return /\.(jpg|jpeg|png|webp)$/i.test(url);
};