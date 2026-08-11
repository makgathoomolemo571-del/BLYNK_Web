export const createStoryValidator = (data) => {
  const errors = [];

  if (!data.creator) errors.push("creator is required");
  if (!data.type) errors.push("type is required");

  const allowedTypes = [
    "text",
    "image",
    "video",
    "link",
    "reel-share",
  ];

  if (data.type && !allowedTypes.includes(data.type)) {
    errors.push("invalid story type");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const viewStoryValidator = (data) => {
  return {
    valid: !!data.storyId,
    errors: data.storyId ? [] : ["storyId required"],
  };
};