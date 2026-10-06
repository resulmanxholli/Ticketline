import type { RequestHandler } from 'express'
import type { Role } from '../models/User.js'
import { getUserById } from '../services/auth.service.js'
import { HttpError } from '../utils/HttpError.js'

export function requireRole(...roles: Role[]): RequestHandler {
  return async (req, _res, next) => {
    const user = await getUserById(req.userId!)
    if (!roles.includes(user.role)) {
      throw new HttpError(403, 'You do not have access to this')
    }
    next()
  }
}