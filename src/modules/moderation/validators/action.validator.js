// modules/moderation/validators/action.validator.js

const Joi = require("joi");

module.exports = Joi.object({

  actionTaken: Joi.string()
    .valid(
      "warning",
      "remove_content",
      "suspend_user",
      "ban_user"
    )
    .required(),

  notes: Joi.string()
    .trim()
    .allow("")
    .max(5000)

});