import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
    path:
    process.env.MODE = 'local'
        ? 'local.env'
        : 'cloud.env'
})

export const MONGO_URI = process.env.MONGO_URI
export const MONGO_SESSION = process.env.MONGO_SESSION