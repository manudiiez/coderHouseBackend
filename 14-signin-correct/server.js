import express from 'express'
import { Server as SocketServer } from 'socket.io'
import http from 'http'
// FLASH
import flash from 'connect-flash'
// MONGO
import MongoStore from 'connect-mongo'
import mongoose from "mongoose"
// HANDLEBARS
import { engine } from 'express-handlebars'
// CONFIG
import { MONGO_SESSION, MONGO_URI } from './config/config.js'
// ROUTERS
import routerAuth from './routers/routerAuth.js'
import router from './routers/router.js'
// PASSPORT
import passport from 'passport'
import './passport/localPassport.js'
// SESSION
import session from 'express-session'

const app = express()
const httpServer = http.createServer(app)
const io = new SocketServer(httpServer)


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(flash());



app.engine('handlebars', engine())
app.set('view engine', 'handlebars')




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

app.use((req, res, next) => {
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.user = req.user;
    console.log(app.locals)
    next();
});

app.use('/api/auth', routerAuth)
app.use('/', router)


/* --------------------------------- SOCKET --------------------------------- */
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
const server = httpServer.listen(process.env.PORT || 8080, () => {
    connect()
    console.log(`Aplicaion en el puerto: ${server.address().port}`)
}) 