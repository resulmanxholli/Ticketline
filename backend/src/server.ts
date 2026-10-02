import express from 'express'
import cors from 'cors'
import { env } from './config/env.js'
import { connectDb } from './config/db.js'

const app = express()

app.use(cors({ origin: env.CORS_ORIGIN }))
app.use(express.json())

await connectDb(env.MONGODB_URI)

app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`)
})

