// modules/businessFind/validators/businessFind.validator.js

const Joi = require("joi");

const objectId = Joi.string().hex().length(24);

const visibility = [
  "public",
  "followers",
  "subscribers",
  "private"
];

const status = [
  "draft",
  "active",
  "paused",
  "closed",
  "completed"
];

exports.create = Joi.object({

  businessName: Joi.string()
    .trim()
    .min(2)
    .max(120)
    .required(),

  industry: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required(),

  campaignName: Joi.string()
    .trim()
    .min(3)
    .max(150)
    .required(),

  campaignObjectives: Joi.string()
    .trim()
    .min(10)
    .max(5000)
    .required(),

  targetAudience: Joi.string()
    .trim()
    .min(3)
    .max(1000)
    .required(),

  campaignBudget: Joi.number()
    .min(0)
    .required(),

  compensationType: Joi.string()
    .valid(
      "fixed",
      "commission",
      "revenue_share",
      "voucher",
      "vig_points",
      "hybrid"
    )
    .required(),

  visibility: Joi.string()
    .valid(...visibility)
    .default("public")

});

exports.update = Joi.object({

  businessName: Joi.string()
    .trim()
    .min(2)
    .max(120),

  industry: Joi.string()
    .trim()
    .min(2)
    .max(100),

  campaignName: Joi.string()
    .trim()
    .min(3)
    .max(150),

  campaignObjectives: Joi.string()
    .trim()
    .min(10)
    .max(5000),

  targetAudience: Joi.string()
    .trim()
    .min(3)
    .max(1000),

  campaignBudget: Joi.number()
    .min(0),

  compensationType: Joi.string()
    .valid(
      "fixed",
      "commission",
      "revenue_share",
      "voucher",
      "vig_points",
      "hybrid"
    ),

  visibility: Joi.string()
    .valid(...visibility)

}).min(1);

exports.apply = Joi.object({

  proposal: Joi.string()
    .trim()
    .min(20)
    .max(5000)
    .required(),

  contentStrategy: Joi.string()
    .trim()
    .min(10)
    .max(3000)
    .required(),

  deliverables: Joi.array()
    .items(
      Joi.string()
        .trim()
        .max(200)
    )
    .min(1)
    .required(),

  fixedFee: Joi.number()
    .min(0)
    .default(0),

  revenueShare: Joi.number()
    .min(0)
    .max(100)
    .default(0),

  sponsorshipDetails: Joi.string()
    .allow("")
    .max(3000),

  portfolio: Joi.array()
    .items(
      Joi.string().uri()
    )
    .default([])

});

exports.updateStatus = Joi.object({

  status: Joi.string()
    .valid(...status)
    .required()

});

exports.id = Joi.object({

  id: objectId.required()

});

exports.validate = (schema) => (req, res, next) => {

  const source =
    req.method === "GET" ||
    req.method === "DELETE"
      ? req.params
      : req.body;

  const { error, value } =
    schema.validate(source, {

      abortEarly: false,
      stripUnknown: true

    });

  if (error) {

    return res.status(400).json({

      success: false,

      message: "Validation failed",

      errors: error.details.map(item => ({
        field: item.path.join("."),
        message: item.message
      }))

    });

  }

  if (
    req.method === "GET" ||
    req.method === "DELETE"
  ) {

    req.params = value;

  } else {

    req.body = value;

  }

  next();

};