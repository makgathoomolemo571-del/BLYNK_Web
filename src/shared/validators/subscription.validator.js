import * as yup from "yup";

export const subscriptionValidator = yup.object({

  plan: yup
    .string()
    .oneOf([
      "FREE_MEMBER",
      "FREE_CREATOR",
      "FREE_BUSINESS",

      "MEMBER_BASIC",
      "MEMBER_PLUS",
      "MEMBER_VIP",

      "CREATOR_BASIC",
      "CREATOR_PLUS",
      "CREATOR_PRO",

      "BUSINESS_BASIC",
      "BUSINESS_PRO",
      "BUSINESS_ENTERPRISE"
    ])
    .required("Plan is required")

});