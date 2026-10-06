import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import { connectDb } from '../config/db.js'
import { env } from '../config/env.js'
import { EventModel } from '../models/Event.js'
import { UserModel } from '../models/User.js'

// Dev-only password shared by every seeded account
const SEED_PASSWORD = 'seatly-dev-123'

// Dates relative to today, so seeded events are always in the future
function daysFromNow(days: number, hour = 20) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  date.setHours(hour, 0, 0, 0)
  return date
}

async function seed() {
  if (process.env.NODE_ENV === 'production') throw new Error('Refusing to seed a production database')

  await connectDb(env.MONGODB_URI)

  // Start clean every time, so running it twice gives the same result
  await Promise.all([UserModel.deleteMany({}), EventModel.deleteMany({})])

  const passwordHash = await bcrypt.hash(SEED_PASSWORD, 12)
  const [organizer] = await UserModel.create([
    { name: 'Olivia Organizer', email: 'organizer@seatly.test', passwordHash, role: 'organizer' },
    { name: 'Ava Admin', email: 'admin@seatly.test', passwordHash, role: 'admin' },
    { name: 'Adam Attendee', email: 'attendee@seatly.test', passwordHash, role: 'attendee' },
  ])
  const owner = organizer._id

  const events = await EventModel.insertMany([
    {
      owner, status: 'published',
      title: 'Midnight Strings', description: 'A late-night chamber set by candlelight.',
      venue: 'Harbour Hall', startsAt: daysFromNow(9), capacity: 400, seatsTaken: 120,
    },
    {
      owner, status: 'published',
      title: 'Open Air Jazz', description: 'Three bands, one long summer evening.',
      venue: 'Riverside Park', startsAt: daysFromNow(16, 18), capacity: 1200, seatsTaken: 1010, // nearly full → amber bar
    },
    {
      owner, status: 'published',
      title: 'Comedy Cellar Live', description: 'Five comics, no filter.',
      venue: 'The Vault', startsAt: daysFromNow(4, 21), capacity: 150, seatsTaken: 150, // sold out → grey bar
    },
    {
      owner, status: 'published',
      title: 'Design Systems Summit', description: 'A day of talks on building UI at scale.',
      venue: 'Civic Centre', startsAt: daysFromNow(30, 9), capacity: 600, seatsTaken: 0,
    },
    {
      owner, status: 'draft', // shouldn't show on the public list
      title: 'Winter Market Nights', description: 'Still being planned.',
      venue: 'Old Town Square', startsAt: daysFromNow(60, 17), capacity: 800, seatsTaken: 0,
    },
    {
      owner, status: 'cancelled',
      title: 'Rooftop Cinema', description: 'Cancelled due to weather.',
      venue: 'Skyline Terrace', startsAt: daysFromNow(2, 20), capacity: 90, seatsTaken: 0,
    },
  ])

  console.log(`Seeded 3 users and ${events.length} events`)
}

seed()
  .catch((err) => {
    console.error(err)
    process.exitCode = 1
  })
  .finally(() => mongoose.disconnect())