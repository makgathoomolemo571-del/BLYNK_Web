import * as yup from "yup";

export const storyValidator = yup.object().shape({

  type: yup
    .string()
    .oneOf(["text", "image", "video", "reel-share"])
    .required("Story type required"),

  media: yup
    .string()
    .when("type", {
      is: (val) => val !== "text",
      then: (schema) => schema.required("Media required"),
      otherwise: (schema) => schema.notRequired()
    }),

  caption: yup
    .string()
    .max(200)

});