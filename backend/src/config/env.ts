import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    PORT: z.coerce.number().int().positive().default(5000),
    MONGODB_URI: z.string().min(1),
    CORS_ORIGIN: z.string().default('http://localhost:5173'),
    JWT_SECRET: z.string().min(32),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
    console.error('Invalid environment variables:', parsed.error)
    process.exit(1)
}

export const env = parsed.data
