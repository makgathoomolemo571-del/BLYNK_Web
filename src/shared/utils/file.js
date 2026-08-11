export const getFileExtension = (fileName) => {
  return fileName.split(".").pop().toLowerCase();
};

export const isImage = (fileName) => {
  const ext = getFileExtension(fileName);
  return ["jpg", "jpeg", "png", "webp"].includes(ext);
};

export const isVideo = (fileName) => {
  const ext = getFileExtension(fileName);
  return ["mp4", "mov", "webm"].includes(ext);
};

export const isAudio = (fileName) => {
  const ext = getFileExtension(fileName);
  return ["mp3", "wav", "aac"].includes(ext);
};

export const formatFileSize = (bytes) => {
  if (!bytes) return "0 B";

  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return (
    parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) +
    " " +
    sizes[i]
  );
};