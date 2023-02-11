import express from 'express'
import engine from 'ejs-mate'
import morgan from 'morgan'
import mongoose from 'mongoose'
import passport from 'passport'
import session from 'express-session'
import flash from 'connect-flash'

import router from './routers/router.js'

import path from 'path';
import { fileURLToPath } from 'url';
import { MONGO_URI } from './keys.js';
import './passport/local-auth.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())


app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', engine);
app.set('view engine', 'ejs');


/* ---------------------------- MONGO CONNECTION ---------------------------- */
const connect = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to mongoDB')
    } catch (error) {
        throw error;
    }
}

// Si esta desconectada devuelve
mongoose.connection.on('disconnected', () => {
    console.log('mongoDB disconnected!!')
})
// Si esta conectada devuelve
mongoose.connection.on('connected', () => {
    console.log('mongoDB connected!!')
})

app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage')
    app.locals.signinMessage = req.flash('signinMessage')
    app.locals.user = req.user
    console.log(app.locals);
    next()
})

app.use('/', router)

/* --------------------------------- SERVER --------------------------------- */
const server = app.listen(process.env.PORT || 8080, () => {
    connect()
    console.log(`Aplicaion en el puerto: ${server.address().port}`)
})  