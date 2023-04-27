import dotenv from 'dotenv'

dotenv.config()

export const MODO = process.env.MODO || 'fork'
export const PORT = process.env.PORT || '8080'
export const MONGO_URI = process.env.MONGO_URI
export const MONGO_SESSION = process.env.MONGO_SESSION
export const SECRET_KEY = process.env.SECRET_KEY
export const EMAILER_CONFIG = { 
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    }
}

export const ADMIN_NUMBER_MSG = process.env.ADMIN_NUMBER_MSG
export const SECRET = "yoursecretkey";
export const ADMIN_EMAIL = 'admin@admin.com'
 