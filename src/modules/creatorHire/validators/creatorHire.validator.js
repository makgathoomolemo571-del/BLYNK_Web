// modules/creatorHire/validators/creatorHire.validator.js

import * as yup from "yup";

const creatorHireValidator = yup.object({

  projectTitle: yup
    .string()
    .trim()
    .required("Project title is required")
    .min(5)
    .max(120),

  category: yup
    .string()
    .required("Category is required"),

  description: yup
    .string()
    .required("Description is required")
    .min(20)
    .max(5000),

  objectives: yup
    .string()
    .required("Objectives are required"),

  deliverables: yup
    .string()
    .required("Deliverables are required"),

  roleRequired: yup
    .string()
    .required("Role required"),

  experienceLevel: yup
    .string()
    .oneOf([
      "junior",
      "mid",
      "senior",
      "expert"
    ])
    .required(),

  skills: yup
    .array()
    .of(yup.string())
    .min(1),

  budgetType: yup
    .string()
    .oneOf([
      "fixed",
      "hourly",
      "negotiable"
    ])
    .required(),

  budgetRange: yup
    .string()
    .required(),

  paymentMethod: yup
    .string()
    .oneOf([
      "vig_points",
      "voucher",
      "hybrid"
    ])
    .required(),

  timelineStart: yup
    .date()
    .required(),

  timelineEnd: yup
    .date()
    .min(
      yup.ref("timelineStart"),
      "End date must be after start date"
    )
    .required(),

  workType: yup
    .string()
    .oneOf([
      "remote",
      "hybrid",
      "onsite"
    ])
    .required(),

  location: yup
    .string()
    .nullable(),

  timeZone: yup
    .string()
    .required(),

  visibility: yup
    .string()
    .oneOf([
      "public",
      "members",
      "subscribers"
    ])
    .default("public")

});

export default creatorHireValidator;