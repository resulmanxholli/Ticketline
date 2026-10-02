import type { RequestHandler } from 'express'
import { verifyToken } from '../services/auth.service.js'
import { HttpError } from '../utils/HttpError.js'

declare global {
  namespace Express {
    interface Request {
      userId?: string
    }
  }
}

export const requireAuth: RequestHandler = (req, _res, next) => {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    throw new HttpError(401, 'Authentication required')
  }
  req.userId = verifyToken(header.slice('Bearer '.length))
  next()
}