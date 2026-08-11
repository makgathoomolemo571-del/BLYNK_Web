const Joi = require("joi");

const updateProfileValidator = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).optional(),

    email: Joi.string().email().optional(),

    firstName: Joi.string().max(50).optional(),

    lastName: Joi.string().max(50).optional(),

    displayName: Joi.string().max(50).optional(),

    bio: Joi.string().max(300).allow("").optional(),

    profilePicture: Joi.string().uri().allow("").optional(),

    coverBanner: Joi.string().uri().allow("").optional(),

    location: Joi.object({
      country: Joi.string().optional(),
      city: Joi.string().optional(),
    }).optional(),

    website: Joi.string().uri().allow("").optional(),

    socials: Joi.object({
      instagram: Joi.string().optional(),
      twitter: Joi.string().optional(),
      tiktok: Joi.string().optional(),
      youtube: Joi.string().optional(),
    }).optional(),
  });

  return schema.validate(data);
};

module.exports = updateProfileValidator;