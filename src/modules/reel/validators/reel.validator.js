const Joi = require("joi");

exports.createReelValidator = Joi.object({
  caption: Joi.string().allow("").max(300),
  mediaUrl: Joi.string().uri().required(),
  thumbnail: Joi.string().uri().allow(null, ""),
  duration: Joi.number().max(180).required()
});

exports.reelActionValidator = Joi.object({
  reelId: Joi.string().required()
});