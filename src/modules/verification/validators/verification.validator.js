// modules/verification/validators/verification.validator.js

import * as yup from "yup";

const verificationTypes = [
  "identity",
  "creator",
  "business",
  "venue",
  "podcast"
];

export const verificationSchema = yup.object({

  type: yup
    .string()
    .oneOf(verificationTypes)
    .required("Verification type is required"),

  fullName: yup
    .string()
    .trim()
    .min(3)
    .max(120)
    .required("Full name is required"),

  idNumber: yup
    .string()
    .trim()
    .max(30)
    .nullable(),

  registrationNumber: yup
    .string()
    .trim()
    .max(100)
    .nullable(),

  taxNumber: yup
    .string()
    .trim()
    .max(100)
    .nullable(),

  website: yup
    .string()
    .trim()
    .url("Invalid website URL")
    .nullable()
    .transform(v => v === "" ? null : v),

  socialLinks: yup
    .array()
    .of(

      yup.object({

        platform: yup
          .string()
          .trim()
          .required(),

        url: yup
          .string()
          .trim()
          .url()
          .required()

      })

    )
    .default([]),

  documents: yup
    .array()
    .of(

      yup.object({

        mediaId: yup
          .string()
          .required()

      })

    )
    .min(
      1,
      "At least one document is required"
    )

});

export const approveSchema = yup.object({

  verificationId: yup
    .string()
    .required()

});

export const rejectSchema = yup.object({

  verificationId: yup
    .string()
    .required(),

  rejectionReason: yup
    .string()
    .trim()
    .min(5)
    .max(500)
    .required()

});

export default {

  verificationSchema,

  approveSchema,

  rejectSchema

};