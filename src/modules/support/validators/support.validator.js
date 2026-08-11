// modules/support/validators/support.validator.js

import * as yup from "yup";

export const supportValidator = yup.object({

  subject: yup
    .string()
    .trim()
    .min(5)
    .max(120)
    .required(),

  issueType: yup
    .string()
    .oneOf([
      "technical",
      "account",
      "login",
      "subscription",
      "payment",
      "creator",
      "business",
      "marketplace",
      "wallet",
      "verification",
      "security",
      "other"
    ])
    .required(),

  description: yup
    .string()
    .trim()
    .min(20)
    .max(5000)
    .required(),

  affectedFeature: yup
    .string()
    .nullable(),

  priority: yup
    .string()
    .oneOf([
      "low",
      "medium",
      "high",
      "urgent"
    ])
    .default("medium")

});