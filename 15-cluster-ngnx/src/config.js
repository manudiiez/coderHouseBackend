import dotenv from 'dotenv'

dotenv.config()

export const MODO = process.env.MODO || 'fork'
export const PORT = process.env.PORT || '8080'
export const MONGO_URI = process.env.MONGO_URI
export const MONGO_SESSION = process.env.MONGO_SESSION
export const SECRET_KEY = process.env.SECRET_KEY