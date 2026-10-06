import type { RequestHandler } from "express";
import * as adminService from "../services/admin.service.js";
import { createUser as createUserAccount } from "../services/auth.service.js";
import {
  createUserSchema,
  updateRoleSchema,
  userIdParamsSchema,
} from "../validation/admin.js";

export const stats: RequestHandler = async (_req, res) => {
  res.json(await adminService.getStats());
};

export const users: RequestHandler = async (_req, res) => {
  res.json({ users: await adminService.listUsers() });
};

export const createUser: RequestHandler = async (req, res) => {
  const input = createUserSchema.parse(req.body);
  const user = await createUserAccount(input);
  res.status(201).json({ user });
};

export const updateRole: RequestHandler = async (req, res) => {
  const { id } = userIdParamsSchema.parse(req.params);
  const { role } = updateRoleSchema.parse(req.body);
  const user = await adminService.updateRole(req.userId!, id, role);
  res.json({ user });
};
