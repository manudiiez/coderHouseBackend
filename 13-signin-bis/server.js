import express from 'express'
import router from './routers/router.js'
import http from 'http'
import { Server as SocketServer } from 'socket.io'
import { engine } from 'express-handlebars'
import mongoose from "mongoose"
import { MONGO_URI } from './config/config.js'



const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

const httpServer = http.createServer(app)
const io = new SocketServer(httpServer)

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