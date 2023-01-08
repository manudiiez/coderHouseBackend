import admin from 'firebase-admin'
import { FIREBASE_CREDENTIALS } from '../config/config.js'

admin.initializeApp({
    credential: admin.credential.cert(FIREBASE_CREDENTIALS)
})

export const firestore = admin.firestore()