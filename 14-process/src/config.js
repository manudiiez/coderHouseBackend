import dotenv from 'dotenv'

dotenv.config()

export const MONGO_URI = process.env.MONGO_URI
export const MONGO_SESSION = process.env.MONGO_SESSION
export const SECRET_KEY = process.env.SECRET_KEY