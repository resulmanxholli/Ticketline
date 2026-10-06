import { z } from 'zod'
import { ROLES } from '../models/User.js'
import { emailField, nameField, passwordField } from './auth.js'

export const userIdParamsSchema = z.object({
  id: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid user id'),
})

export const updateRoleSchema = z.object({
  role: z.enum(ROLES),
})

export const createUserSchema = z.object({
  name: nameField,
  email: emailField,
  password: passwordField,
  role: z.enum(['organizer', 'admin']).default('organizer'),
})