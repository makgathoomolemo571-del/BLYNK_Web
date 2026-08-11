import * as yup from "yup";

export const reelValidator = yup.object().shape({

  caption: yup
    .string()
    .max(250),

  video: yup
    .string()
    .required("Reel video is required"),

  music: yup
    .string()
    .nullable(),

  duration: yup
    .number()
    .max(180, "Max reel length is 3 minutes")

});