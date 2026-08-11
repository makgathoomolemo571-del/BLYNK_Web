export const validateCreatePost = (data) => {
  const errors = {};

  if (!data.caption && (!data.media || data.media.length === 0)) {
    errors.content = "Post must have caption or media";
  }

  if (data.caption && data.caption.length > 2000) {
    errors.caption = "Caption too long";
  }

  if (data.media && data.media.length > 10) {
    errors.media = "Max 10 media files allowed";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};