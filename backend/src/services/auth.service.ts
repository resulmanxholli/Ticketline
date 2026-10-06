import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { env } from '../config/env.js'
import { UserModel, type Role } from '../models/User.js'
import { HttpError } from '../utils/HttpError.js'
import type { LoginInput, RegisterInput } from '../validation/auth.js'

function signToken(userId: string) {
  return jwt.sign({}, env.JWT_SECRET, { subject: userId, expiresIn: '7d', algorithm: 'HS256' })
}

type NewUser = { name: string; email: string; password: string; role: Role }

export async function createUser(input: NewUser) {
  const passwordHash = await bcrypt.hash(input.password, 12)

  try {
    return await UserModel.create({
      name: input.name,
      email: input.email,
      passwordHash,
      role: input.role,
    })
  } catch (err) {
    if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
      throw new HttpError(409, 'Email is already registered')
    }
    throw err
  }
}

export async function register(input: RegisterInput) {
  const user = await createUser({ ...input, role: 'attendee' })
  return { user, token: signToken(user._id.toString()) }
}

export async function login(input: LoginInput) {
  const user = await UserModel.findOne({ email: input.email }).select('+passwordHash')
  const passwordOk = user !== null && (await bcrypt.compare(input.password, user.passwordHash))

  if (!user || !passwordOk) {
    throw new HttpError(401, 'Invalid email or password')
  }
  return { user, token: signToken(user._id.toString()) }
}

export function verifyToken(token: string) {
  try {
    const payload = jwt.verify(token, env.JWT_SECRET, { algorithms: ['HS256'] })
    if (typeof payload === 'string' || !payload.sub) throw new Error('bad payload')
    return payload.sub
  } catch {
    throw new HttpError(401, 'Invalid or expired token')
  }
}

export async function getUserById(id: string) {
  const user = await UserModel.findById(id)
  if (!user) throw new HttpError(401, 'User no longer exists')
  return user
}