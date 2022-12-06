const { engine } = require('express-handlebars')
const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const {router, contenedorProductos, contenedorChat} = require('./routers/router.js')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('public'))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.use('/', router)

// SOCKET 
io.on('connection', socket => {
    console.log('new connection', socket.id)

    socket.on('product:save', async() => {
        io.sockets.emit('product:save', await contenedorProductos.getAll());
    })
    
    socket.on('chat:message', async() => {
        io.sockets.emit('chat:message', await contenedorChat.getAll());
    })

})

const server = httpServer.listen(8080, () => {
    console.log(`Aplicaion en el puerto: ${server.address().port}`)
})
  