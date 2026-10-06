import { EventModel } from '../models/Event.js'
import { UserModel, type Role } from '../models/User.js'
import { HttpError } from '../utils/HttpError.js'

type CountRow = { _id: string; count: number }

function toCounts(rows: CountRow[]) {
  return Object.fromEntries(rows.map((row) => [row._id, row.count])) as Record<string, number>
}

export async function getStats() {
  const [usersByRole, eventsByStatus, seats] = await Promise.all([
    UserModel.aggregate<CountRow>([{ $group: { _id: '$role', count: { $sum: 1 } } }]),
    EventModel.aggregate<CountRow>([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    EventModel.aggregate<{ capacity: number; taken: number }>([
      { $match: { status: 'published' } },
      { $group: { _id: null, capacity: { $sum: '$capacity' }, taken: { $sum: '$seatsTaken' } } },
    ]),
  ])

  const users = toCounts(usersByRole)
  const events = toCounts(eventsByStatus)

  return {
    users: {
      total: usersByRole.reduce((sum, row) => sum + row.count, 0),
      attendee: users.attendee ?? 0,
      organizer: users.organizer ?? 0,
      admin: users.admin ?? 0,
    },
    events: {
      total: eventsByStatus.reduce((sum, row) => sum + row.count, 0),
      draft: events.draft ?? 0,
      published: events.published ?? 0,
      cancelled: events.cancelled ?? 0,
    },
    seats: { capacity: seats[0]?.capacity ?? 0, taken: seats[0]?.taken ?? 0 },
  }
}

export async function listUsers() {
  return UserModel.find().sort({ createdAt: -1 }).limit(100)
}

export async function updateRole(actorId: string, targetId: string, role: Role) {
  if (actorId === targetId && role !== 'admin') {
    throw new HttpError(400, "You can't remove your own admin role")
  }

  const user = await UserModel.findByIdAndUpdate(
    targetId,
    { role },
    { returnDocument: 'after', runValidators: true },
  )
  if (!user) throw new HttpError(404, 'User not found')
  return user
}