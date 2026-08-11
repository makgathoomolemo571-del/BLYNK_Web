import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .min(1, "Email is required")
    .trim(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password too long")
});

export const validateLogin = (data) => {
  return loginSchema.safeParse(data);
};