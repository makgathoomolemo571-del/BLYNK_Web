const validateProfileUpdate = (data) => {
  const errors = [];

  if (data.firstName && typeof data.firstName !== "string") {
    errors.push("firstName must be a string");
  }

  if (data.lastName && typeof data.lastName !== "string") {
    errors.push("lastName must be a string");
  }

  if (data.displayName && typeof data.displayName !== "string") {
    errors.push("displayName must be a string");
  }

  if (data.bio && data.bio.length > 300) {
    errors.push("bio cannot exceed 300 characters");
  }

  if (data.website && typeof data.website !== "string") {
    errors.push("website must be a string");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

module.exports = {
  validateProfileUpdate,
};