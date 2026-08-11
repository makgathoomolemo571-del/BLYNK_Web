// modules/podcast/validators/podcast.validator.js

import * as yup from "yup";

const podcastValidator = yup.object({

  name: yup
    .string()
    .trim()
    .min(3)
    .max(120)
    .required(),

  description: yup
    .string()
    .trim()
    .max(2000)
    .nullable(),

  category: yup
    .string()
    .required(),

  coverImage: yup
    .string()
    .nullable(),

  visibility: yup
    .string()
    .oneOf([
      "public",
      "followers",
      "subscribers",
      "private"
    ])
    .required()

});

export default podcastValidator;