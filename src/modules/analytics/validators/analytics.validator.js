const EVENT_TYPES = [
  "PROFILE_VIEWED",
  "CREATOR_PROFILE_VIEWED",
  "BUSINESS_PROFILE_VIEWED",

  "POST_CREATED",
  "POST_VIEWED",
  "POST_LIKED",
  "POST_COMMENTED",
  "POST_SHARED",

  "REEL_CREATED",
  "REEL_VIEWED",
  "REEL_LIKED",
  "REEL_SHARED",

  "STORY_CREATED",
  "STORY_VIEWED",
  "STORY_REPLIED",

  "PODCAST_CREATED",
  "PODCAST_PLAYED",
  "PODCAST_SHARED",

  "WATCHPARTY_CREATED",
  "WATCHPARTY_JOINED",

  "MARKETPLACE_CREATED",
  "MARKETPLACE_VIEWED",

  "CREATOR_HIRE_CREATED",
  "BUSINESS_FIND_CREATED",

  "LOGIN",
  "REGISTER",
  "LOGOUT"
];

export function validateAnalytics(data = {}) {
  const errors = {};

  if (!data.eventType) {
    errors.eventType = "Event type is required";
  }

  if (
    data.eventType &&
    !EVENT_TYPES.includes(data.eventType)
  ) {
    errors.eventType = "Invalid analytics event";
  }

  if (
    data.targetType &&
    typeof data.targetType !== "string"
  ) {
    errors.targetType =
      "Target type must be a string";
  }

  if (
    data.metadata &&
    typeof data.metadata !== "object"
  ) {
    errors.metadata =
      "Metadata must be an object";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

export default validateAnalytics;