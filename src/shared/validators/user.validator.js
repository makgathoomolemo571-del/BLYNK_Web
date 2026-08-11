import * as yup from "yup";

export const updateUserValidator = yup.object({

username: yup.string().min(3).max(30),

displayName: yup.string().max(50),

bio: yup.string().max(200),

location: yup.string().max(100),

gender: yup.string().oneOf(["male", "female", "other"]),

dateOfBirth: yup.date()

});