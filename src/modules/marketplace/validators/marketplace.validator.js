// modules/marketplace/validators/marketplace.validator.js

import * as yup from "yup";

export const marketplaceValidator = yup.object({

  listingType: yup
    .string()
    .oneOf([
      "creator_service",
      "business_opportunity",
      "sponsorship",
      "collaboration",
      "freelance_service",
      "event_opportunity"
    ])
    .required("Listing type is required"),

  title: yup
    .string()
    .trim()
    .min(3)
    .max(120)
    .required("Title is required"),

  category: yup
    .string()
    .trim()
    .max(80),

  description: yup
    .string()
    .trim()
    .max(5000),

  price: yup
    .number()
    .nullable()
    .transform((v, o) =>
      o === "" ? null : v
    )
    .min(0),

  budgetRange: yup
    .string()
    .trim()
    .max(120),

  location: yup
    .string()
    .trim()
    .max(150),

  visibility: yup
    .string()
    .oneOf([
      "public",
      "members",
      "subscribers"
    ])
    .required()

});

export const marketplaceApplicationValidator =
yup.object({

  message: yup
    .string()
    .trim()
    .min(10)
    .max(1000)
    .required("Application message is required"),

  proposedPrice: yup
    .number()
    .required("Proposed price is required")
    .min(0)

});

export default marketplaceValidator;