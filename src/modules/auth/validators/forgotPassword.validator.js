import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email format").trim()
});

export const validateForgotPassword = (data) => {
  return forgotPasswordSchema.safeParse(data);
};