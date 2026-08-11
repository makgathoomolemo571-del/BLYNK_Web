// modules/moderation/validators/report.validator.js

const Joi = require("joi");

module.exports = Joi.object({

  targetType: Joi.string()
    .valid(
      "user",
      "post",
      "reel",
      "story",
      "podcast",
      "episode",
      "comment",
      "message",
      "marketplace",
      "creatorHire",
      "businessFind"
    )
    .required(),

  targetId: Joi.string()
    .trim()
    .required(),

  reason: Joi.string()
    .valid(
      "spam",
      "harassment",
      "hate_speech",
      "fake_account",
      "copyright",
      "scam",
      "nudity",
      "violence",
      "misinformation",
      "other"
    )
    .required(),

  description: Joi.string()
    .trim()
    .allow("")
    .max(2000)

});