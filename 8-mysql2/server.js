import express from 'express'
import {engine} from 'express-handlebars'
import { Server as SocketServer } from 'socket.io'
import http from 'http'
import routerProducts from './routers/routerProducts.js'
import routerAuth from './routers/routerAuth.js'
import routerCart from './routers/routerCart.js'
import routerChat from './routers/routerChat.js'
import router, { contenedorChat, contenedorProductos } from './routers/router.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
const httpServer = http.createServer(app)
const io = new SocketServer(httpServer)

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

// VIEWS
app.use('/', router)

// ROUTERS
app.use('/api/products', routerProducts)
app.use('/api/chat', routerChat)
app.use('/api/shoppingcart', routerCart)
app.use('/api/auth', routerAuth)

app.use('*', (req, res) => {
    res.status(404).json( { error : -2, descripcion:`ruta '${req.url}' método '${req.method}' no implementada`})
})

// SOCKET 
io.on('connection', socket => {
    console.log('new connection', socket.id)
    
    socket.on('product:save', async() => {
        console.log(await contenedorProductos.getAll());
        io.sockets.emit('product:save', await contenedorProductos.getAll());
    })
    
    socket.on('chat:message', async() => {
        io.sockets.emit('chat:message', await contenedorChat.getAll());
    })
    
})

const server = httpServer.listen(process.env.PORT || 8080, () => {
    console.log(`Aplicaion en el puerto: ${server.address().port}`)
})