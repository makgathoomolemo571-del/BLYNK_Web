import * as yup from "yup";

export const postValidator = yup.object().shape({

  caption: yup
    .string()
    .max(500, "Caption too long"),

  type: yup
    .string()
    .oneOf(["text", "image", "video", "link"])
    .required("Post type required"),

  media: yup
    .array()
    .of(yup.string())
    .when("type", {
      is: (val) => val !== "text",
      then: (schema) => schema.required("Media required"),
      otherwise: (schema) => schema.notRequired()
    })

});