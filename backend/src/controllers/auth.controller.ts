import type { RequestHandler } from "express";
import * as authService from "../services/auth.service.js";
import { loginSchema, registerSchema } from "../validation/auth.js";

export const register: RequestHandler = async (req, res) => {
  const input = registerSchema.parse(req.body);
  const { user, token } = await authService.register(input);
  res.status(201).json({ user, token });
};

export const login: RequestHandler = async (req, res) => {
  const input = loginSchema.parse(req.body);
  const { user, token } = await authService.login(input);
  res.json({ user, token });
};

export const me: RequestHandler = async (req, res) => {
  const user = await authService.getUserById(req.userId!);
  res.json({ user });
};
