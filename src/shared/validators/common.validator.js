import * as yup from "yup";

export const email = yup
  .string()
  .email("Invalid email")
  .required("Email is required");

export const password = yup
  .string()
  .min(8, "Password must be at least 8 characters")
  .required("Password is required");

export const username = yup
  .string()
  .min(3)
  .max(30)
  .required();

export const phone = yup
  .string()
  .min(10)
  .max(15);

export const requiredString = (field) =>
  yup.string().required(`${field} is required`);