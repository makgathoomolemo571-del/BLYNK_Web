import { z } from "zod";

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token required"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/)
    .regex(/[^A-Za-z0-9]/),

  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

export const validateResetPassword = (data) => {
  return resetPasswordSchema.safeParse(data);
};