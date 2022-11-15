const router = require('./routers/router.js')

const { engine } = require('express-handlebars')
const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

// APP
const app = express()
const httpServer = new HttpServer(app)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const io = new IOServer(httpServer)

app.use(express.static('public'))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.use('/', router)

// WEBSOCKET

io.on('connection', socket => {
    console.log('new connection', socket.id)

    socket.emit('server:connection', socket.id)

    socket.on('product:save', (data) => {
        io.sockets.emit('product:save', data);
    })
})

const server = httpServer.listen(8080, () => {
    console.log(`Aplicaion en el puerto: ${server.address().port}`)
})
