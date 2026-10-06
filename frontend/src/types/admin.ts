import type { Role, User } from './user'

export type AdminUser = User & { createdAt: string }

export type AdminStats = {
  users: Record<Role, number> & { total: number }
  events: { total: number; draft: number; published: number; cancelled: number }
  seats: { capacity: number; taken: number }
}