import { z } from "zod";

export const UserSchema = z.object({
  id: z.number().nullish(),
  username: z.string().min(3).max(30).optional(),
  email: z.string().email().min(5).max(100),
  password: z.string().min(6).max(100),
  createdAt: z.date().nullish(),
  role: z.enum(["USER", "ADMIN"]).nullish(),
});

export type User = z.infer<typeof UserSchema>;