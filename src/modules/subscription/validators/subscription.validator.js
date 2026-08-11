const Joi = require("joi");

exports.createSubscription = (data) => {
  const schema = Joi.object({
    plan: Joi.string().required()
  });

  return schema.validate(data);
};

exports.upgradeSubscription = (data) => {
  const schema = Joi.object({
    plan: Joi.string().required()
  });

  return schema.validate(data);
};

exports.cancelSubscription = (data) => {
  return { value: data };
};