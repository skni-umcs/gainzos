import { email, z } from "zod";

export const AuthResponse = z.object({
  status: z.boolean(),
  message: z.string().nullish(),
  session: z.object({
    sessionId: z.string(),
    username: z.string(),
    authority: z.string(),
    email: email(),
  }).nullish(),
});

export type AuthResponse = z.infer<typeof AuthResponse>;