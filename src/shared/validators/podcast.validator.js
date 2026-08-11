import * as yup from "yup";

export const podcastValidator = yup.object({

  title: yup
    .string()
    .required("Title is required")
    .min(3)
    .max(120),

  description: yup
    .string()
    .max(1000),

  category: yup
    .string()
    .required(),

  coverImage: yup
    .string()
    .nullable(),

  isPublic: yup
    .boolean()
    .default(true)

});