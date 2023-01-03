import express from 'express'
import { engine } from 'express-handlebars'
import { Server as SocketServer } from 'socket.io'
import http from 'http'
import mongoose from "mongoose"
/* --------------------------------- ROUTES --------------------------------- */
import routerProducts from './routers/routerProducts.js'
import routerAuth from './routers/routerAuth.js'
import routerCart from './routers/routerCart.js'
import routerChat from './routers/routerChat.js'
/* ---------------------------- ROUTES WEBSOCKET ---------------------------- */
import router, { contenedorChat, contenedorProductos } from './routers/router.js'


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
const httpServer = http.createServer(app)
const io = new SocketServer(httpServer)

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

/* ---------------------------- MONGO CONNECTION ---------------------------- */
const connect = async () => {
    try {
        // await mongoose.connect(process.env.MONGO);
        await mongoose.connect('mongodb://localhost:27017/ecommerce');
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

// VIEWS
app.use('/', router)

// API
app.use('/api/products', routerProducts)
app.use('/api/chat', routerChat)
app.use('/api/shoppingcart', routerCart)
app.use('/api/auth', routerAuth)

// DEFAULT
app.use('*', (req, res) => {
    res.status(404).json({ error: -2, descripcion: `ruta '${req.url}' método '${req.method}' no implementada` })
})

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