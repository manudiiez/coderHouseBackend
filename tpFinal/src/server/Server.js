// EXPRESS
import express from 'express'
import http from 'http'
// SESSION
import session from 'express-session'
// MONGODB
import mongoose from "mongoose"
import MongoStore from 'connect-mongo'
// MORGAN
import morgan from 'morgan'
// FLASH
import flash from 'connect-flash'
// ENV
import dotenv from 'dotenv'
// CONFIG
import { MONGO_SESSION, MONGO_URI, SECRET_KEY } from '../config/config.js'
// ROUTERS
import routerUsers from '../routers/routerUsers.js'
import router from '../routers/router.js'
import routerSessions from '../routers/routerSessions.js'
import routerProducts from '../routers/routerProducts.js'
import routerCarts from '../routers/routerCarts.js'
import routerOrders from '../routers/routerOrders.js'

export default class Server {
    #app
    #server

    constructor() {
        this.#app = express()
    }

    async conectar({ puerto = 0 }) {
        return new Promise((resolve, reject) => {

            // Para que funcionen las variables de entorno
            dotenv.config()

            /* ---------------------------- MONGO CONNECTION ---------------------------- */
            const connect = async () => {
                try {
                    await mongoose.connect(MONGO_URI);
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

            /* ------------------------------- MIDDLEWARES ------------------------------ */
            this.#app.use(express.json())
            this.#app.use(express.urlencoded({ extended: true }))
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

            /* --------------------------------- ROUTES --------------------------------- */
            this.#app.use('/api/orders', routerOrders)
            this.#app.use('/api/shoppingcartproducts', routerCarts)
            this.#app.use('/api/products', routerProducts)
            this.#app.use('/api/sessions', routerSessions)
            this.#app.use('/api/users', routerUsers)
            this.#app.use('/', router)

            /* ------------------------------- FLASH ROUTE ------------------------------ */
            this.#app.use((req, res, next) => {
                this.#app.locals.errorMessage = req.flash('errorMessage')
                this.#app.locals.signupMessage = req.flash('signupMessage')
                this.#app.locals.signinMessage = req.flash('signinMessage')
                // this.#app.locals.successMessage = req.flash('successMessage')
                this.#app.locals.user = req.user
                console.log(this.#app.locals);
                next()
            })

            const httpServer = http.createServer(this.#app)
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