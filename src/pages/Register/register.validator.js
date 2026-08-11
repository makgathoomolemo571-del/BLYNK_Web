import { z } from "zod";

export const registerSchema = z.object({

  username: z.string()
    .min(3, "Username too short")
    .max(30),

  email: z.string()
    .email("Invalid email"),

  password: z.string()
    .min(8, "Password too short"),

  role: z.enum(["member", "creator", "business"])

});