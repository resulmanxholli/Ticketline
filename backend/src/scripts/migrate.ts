import { readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import mongoose, { type mongo } from 'mongoose'
import { connectDb } from '../config/db.js'
import { env } from '../config/env.js'

type Migration = { up: (db: mongo.Db) => Promise<void> }
type AppliedMigration = { name: string; appliedAt: Date }

const migrationsDir = fileURLToPath(new URL('../migrations/', import.meta.url))

async function migrate() {
  await connectDb(env.MONGODB_URI)
  const db = mongoose.connection.db!

  // A collection that remembers which migrations already ran
  const applied = db.collection<AppliedMigration>('migrations')
  const done = new Set((await applied.find().toArray()).map((m) => m.name))

  // 001-..., 002-... sorted, so they always run in order
  const files = (await readdir(migrationsDir))
    .filter((file) => /^\d+-.+\.(ts|js)$/.test(file) && !file.endsWith('.d.ts'))
    .sort()

  for (const file of files) {
    const name = file.replace(/\.(ts|js)$/, '')
    if (done.has(name)) continue

    const migration: Migration = await import(pathToFileURL(path.join(migrationsDir, file)).href)
    console.log(`Running ${name}`)
    await migration.up(db)
    await applied.insertOne({ name, appliedAt: new Date() })
  }

  console.log('Migrations up to date')
}

migrate()
  .catch((err) => {
    console.error(err)
    process.exitCode = 1
  })
  .finally(() => mongoose.disconnect())