const Joi = require("joi");

exports.generate = Joi.object({
  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(20)
});

exports.track = Joi.object({
  id: Joi.string()
    .required()
});

exports.create = Joi.object({

  user: Joi.string()
    .required(),

  type: Joi.string()
    .valid(
      "creator",
      "business",
      "post",
      "reel",
      "story",
      "podcast",
      "marketplace",
      "creatorHire",
      "businessFind",
      "venue"
    )
    .required(),

  targetId: Joi.string()
    .required(),

  score: Joi.number()
    .min(0)
    .max(100)
    .default(0),

  reason: Joi.string()
    .allow("")
    .max(500)
});

exports.update = Joi.object({

  score: Joi.number()
    .min(0)
    .max(100),

  reason: Joi.string()
    .allow("")
    .max(500)

}).min(1);