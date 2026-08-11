// modules/watchParty/validators/createWatchParty.validator.js

import * as yup from "yup";

const TYPES = [
  "creator_live",
  "business_live",
  "venue_live",
  "watch_party",
];

const VISIBILITY = [
  "public",
  "followers",
  "subscribers",
  "private",
];

export const createWatchPartyValidator = yup.object({

  title: yup
    .string()
    .trim()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(120, "Title cannot exceed 120 characters"),

  description: yup
    .string()
    .trim()
    .max(1000, "Description cannot exceed 1000 characters")
    .nullable(),

  type: yup
    .string()
    .oneOf(TYPES)
    .default("watch_party"),

  thumbnail: yup
    .string()
    .trim()
    .url("Thumbnail must be a valid URL")
    .nullable(),

  visibility: yup
    .string()
    .oneOf(VISIBILITY)
    .default("public"),

});

export default createWatchPartyValidator;