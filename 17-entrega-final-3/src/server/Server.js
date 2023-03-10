// EXPRESS
import express from 'express'
// SOCKET
import { Server as SocketServer } from 'socket.io'
import http from 'http'
// SESSION
import session from 'express-session'
// MONGODB
import mongoose from "mongoose"
import MongoStore from 'connect-mongo'
// MORGAN
import morgan from 'morgan'
// PASSPORT
import passport from 'passport'
import '../passport/local-auth.js'
// FLASH
import flash from 'connect-flash'
// ENV 
import dotenv from 'dotenv'
// EJS
import engine from 'ejs-mate'
// PATH
import path from 'path';
import { fileURLToPath } from 'url';
// CONFIG
import { MONGO_SESSION, MONGO_URI, SECRET_KEY } from '../utils/config.js'
// ROUTERS
import router from '../routers/router.js'
import routerApi from '../routers/routerApi.js'

export default class Server {
    #app
    #server

    constructor() {
        this.#app = express()
    } 

    async conectar({ puerto = 0 }) {
        return new Promise((resolve, reject) => {

            dotenv.config()

            const __filename = fileURLToPath(import.meta.url);
            let __dirname = path.dirname(__filename);
            __dirname = __dirname.substr(0, __dirname.length - 10);

            /* ---------------------------- MONGO CONNECTION ---------------------------- */
            const connect = async () => {
                try {
                    await mongoose.connect(MONGO_URI);
                } catch (error) {
                    throw error;
                }
            }
            mongoose.connection.on('disconnected', () => {
                console.log('mongoDB disconnected!!')
            })
            mongoose.connection.on('connected', () => {
                console.log('mongoDB connected!!')
            })

            /* ------------------------------- MIDDLEWARES ------------------------------ */
            this.#app.use(express.json())
            this.#app.use(express.urlencoded({ extended: true }))
            this.#app.use(express.static(__dirname + 'public'));
            /* --------------------------------- MORGAN --------------------------------- */
            this.#app.use(morgan('dev'))
            /* --------------------------------- SESSION -------------------------------- */
            this.#app.use(session({
                secret: 'secret',
                resave: false,
                saveUninitialized: false
            }))

            this.#app.use(session({
                store: MongoStore.create({ mongoUrl: MONGO_SESSION }),
                /* ----------------------------------------------------- */
                secret: SECRET_KEY,
                resave: false,
                saveUninitialized: false,
                cookie: {
                    maxAge: 60000
                }
            }))

            /* ---------------------------------- FLASH --------------------------------- */
            this.#app.use(flash())

            /* -------------------------------- PASSPORT -------------------------------- */
            this.#app.use(passport.initialize())
            this.#app.use(passport.session())

            /* ---------------------------------- VIEWS --------------------------------- */
            this.#app.set('views', path.join(__dirname, 'views'))

            /* ----------------------------------- EJS ---------------------------------- */
            this.#app.engine('ejs', engine);
            this.#app.set('view engine', 'ejs');

            /* ------------------------------- FLASH ROUTE ------------------------------ */
            this.#app.use((req, res, next) => {
                this.#app.locals.signupMessage = req.flash('signupMessage')
                this.#app.locals.signinMessage = req.flash('signinMessage')
                this.#app.locals.user = req.user
                // console.log(this.#app.locals);
                next()
            })

            /* --------------------------------- ROUTES --------------------------------- */
            this.#app.use('/', router)
            this.#app.use('/api', routerApi)

            /* --------------------------------- SOCKET --------------------------------- */
            const httpServer = http.createServer(this.#app)
            const io = new SocketServer(httpServer)

            io.on('connection', socket => {
                console.log('new connection', socket.id)
            })

            /* --------------------------------- SERVER --------------------------------- */
            this.#server = httpServer.listen(puerto, () => {
                connect()
                console.log(`Aplicacion en el puerto: ${this.#server.address().port}`)
            })

            this.#server.on('error', error => {
                reject(error)
            })

        })

    }

    async desconectar() {
        return new Promise((resolve, reject) => {
            this.#server.close(error => {
                if (error) {
                    reject(error)
                } else {
                    resolve(true)
                }
            })
        })
    }
}