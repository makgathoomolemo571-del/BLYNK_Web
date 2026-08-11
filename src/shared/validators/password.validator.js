import * as yup from "yup";

export const changePasswordValidator = yup.object({

currentPassword: yup
.string()
.required(),

newPassword: yup
.string()
.min(8)
.required(),

confirmPassword: yup
.string()
.oneOf([yup.ref("newPassword")], "Passwords must match")
.required()

});

export const resetPasswordValidator = yup.object({

password: yup
.string()
.min(8)
.required(),

token: yup
.string()
.required()

});