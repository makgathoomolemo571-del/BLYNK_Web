// modules/moderation/constants/moderation.constants.js

const MODERATION = {

  TARGETS: {

    USER: "user",
    POST: "post",
    REEL: "reel",
    STORY: "story",
    PODCAST: "podcast",
    EPISODE: "episode",
    COMMENT: "comment",
    MESSAGE: "message",
    MARKETPLACE: "marketplace",
    CREATOR_HIRE: "creatorHire",
    BUSINESS_FIND: "businessFind"

  },

  REASONS: {

    SPAM: "spam",
    HARASSMENT: "harassment",
    HATE_SPEECH: "hate_speech",
    FAKE_ACCOUNT: "fake_account",
    COPYRIGHT: "copyright",
    SCAM: "scam",
    NUDITY: "nudity",
    VIOLENCE: "violence",
    MISINFORMATION: "misinformation",
    OTHER: "other"

  },

  STATUS: {

    PENDING: "pending",
    UNDER_REVIEW: "under_review",
    APPROVED: "approved",
    REJECTED: "rejected",
    RESOLVED: "resolved"

  },

  SEVERITY: {

    LOW: "low",
    MEDIUM: "medium",
    HIGH: "high",
    CRITICAL: "critical"

  },

  ACTIONS: {

    NONE: "none",
    WARNING: "warning",
    REMOVE_CONTENT: "remove_content",
    SUSPEND_USER: "suspend_user",
    BAN_USER: "ban_user"

  }

};

export default MODERATION;