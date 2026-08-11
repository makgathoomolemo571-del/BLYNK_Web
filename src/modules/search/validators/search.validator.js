// modules/search/validators/search.validator.js

import * as yup from "yup";

export const searchValidator = yup.object({

  query: yup
    .string()
    .trim()
    .required("Search query is required")
    .min(2, "Minimum 2 characters")
    .max(100, "Maximum 100 characters"),

  type: yup
    .string()
    .oneOf([
      "all",
      "users",
      "creators",
      "businesses",
      "posts",
      "reels",
      "stories",
      "podcasts",
      "episodes",
      "marketplace",
      "jobs",
      "venues"
    ])
    .default("all")

});