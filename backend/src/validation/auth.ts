import { z } from "zod";

export const nameField = z.string().trim().min(1).max(100);
export const emailField = z.string().trim().toLowerCase().pipe(z.email());
export const passwordField = z.string().min(8).max(72);

export const registerSchema = z.object({
  name: nameField,
  email: emailField,
  password: passwordField,
});

export const loginSchema = z.object({
  email: emailField,
  password: passwordField,
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
