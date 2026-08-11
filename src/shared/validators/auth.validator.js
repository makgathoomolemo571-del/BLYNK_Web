import * as yup from "yup";

export const loginValidator = yup.object({

email: yup
.string()
.email("Invalid email")
.required("Email is required"),

password: yup
.string()
.min(6, "Password too short")
.required("Password is required")

});

export const registerValidator = yup.object({

username: yup
.string()
.min(3)
.max(30)
.required(),

email: yup
.string()
.email()
.required(),

password: yup
.string()
.min(8)
.required(),

confirmPassword: yup
.string()
.oneOf([yup.ref("password")], "Passwords must match")
.required()

});