import * as yup from "yup";

export const depositValidator = yup.object({

  amount: yup
    .number()
    .typeError("Amount is required")
    .positive("Amount must be greater than 0")
    .required("Amount is required")

});

export const withdrawValidator = yup.object({

  amount: yup
    .number()
    .typeError("Amount is required")
    .positive("Amount must be greater than 0")
    .required("Amount is required")

});

export const redeemVoucherValidator = yup.object({

  voucherId: yup
    .string()
    .trim()
    .required("Voucher is required"),

  points: yup
    .number()
    .typeError("Points are required")
    .positive()
    .required()

});

export const transferValidator = yup.object({

  recipientId: yup
    .string()
    .trim()
    .required("Recipient is required"),

  amount: yup
    .number()
    .typeError("Amount is required")
    .positive()
    .required()

});

export default {

  depositValidator,

  withdrawValidator,

  redeemVoucherValidator,

  transferValidator

};