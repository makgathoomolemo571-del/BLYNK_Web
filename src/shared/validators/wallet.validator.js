import * as yup from "yup";

export const withdrawValidator = yup.object().shape({

  amount: yup
    .number()
    .required("Amount is required")
    .min(10, "Minimum withdrawal is 10 tokens"),

  method: yup
    .string()
    .oneOf(["VOUCHER", "GIFT_CARD", "PRODUCT"])
    .required("Withdrawal method required"),

  destination: yup
    .string()
    .required("Destination is required")

});