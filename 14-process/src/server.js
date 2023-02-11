// EXPRESS
import express from 'express'
// MORGAN
import morgan from 'morgan'
// SOCKET
import { Server as SocketServer } from 'socket.io'
import http from 'http'
// SESSION
import session from 'express-session'
// MONGODB
import mongoose from "mongoose"
import MongoStore from 'connect-mongo'
// PASSPORT
import passport from 'passport'
// FLASH
import flash from 'connect-flash'
import dotenv from 'dotenv'
// EJS
import engine from 'ejs-mate'
// PATH
import path from 'path';
import { fileURLToPath } from 'url';
// YARGS
import yargs from "yargs";

// CONFIG
import { MONGO_SESSION, MONGO_URI, SECRET_KEY } from './config.js'
import './passport/local-auth.js'
// ROUTES
import router from './routers/router.js'
import routerAuth from './routers/routerAuth.js'
import routerProducts from './routers/routerProducts.js'
import routerRandom from './routers/routerRandom.js'

const app = express() 
dotenv.config()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

/* ------------------------------- MIDDLEWARES ------------------------------ */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(express.static('public'))
app.use(express.static(__dirname + '/public'));
// MORGAN
app.use(morgan('dev'))
// SESSION
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))
app.use(session({
    store: MongoStore.create({ mongoUrl: MONGO_SESSION }),
    /* ----------------------------------------------------- */
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    } 
})) 
// FLASH
app.use(flash())
// PASSPORT
app.use(passport.initialize())
app.use(passport.session())
// VIEWS
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', engine);
app.set('view engine', 'ejs');


/* --------------------------------- ROUTES --------------------------------- */
app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage')
    app.locals.signinMessage = req.flash('signinMessage')
    app.locals.user = req.user
    // console.log(app.locals);
    next()
})

app.use('/api/auth', routerAuth)
app.use('/api/products', routerProducts)
app.use('/api/randoms', routerRandom)
app.use('/', router)


/* --------------------------------- SOCKET --------------------------------- */
const httpServer = http.createServer(app)
const io = new SocketServer(httpServer)


io.on('connection', socket => {
    console.log('new connection', socket.id)

    socket.on('product:save', async () => {
        io.sockets.emit('product:save', await contenedorProductos.getAll());
    })

    socket.on('chat:message', async () => {
        io.sockets.emit('chat:message', await contenedorChat.getAll());
    })
})



/* --------------------------------- SERVER --------------------------------- */
const info = yargs(process.argv.slice(2))
    .alias({ port: 'port' })
    .default({ port: 8080 })
    .argv
const server = app.listen(info.port || 8080, () => {
    connect()
    console.log(`Aplicaion en el puerto: ${server.address().port}`)
})  