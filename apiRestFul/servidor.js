const routerProductos = require('./routers/routerProductos.js')

const express = require('express')


const app = express()
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

app.use('/api/productos', routerProductos)


const server = app.listen(8080, () => {
    console.log(`Aplicaion en el puerto: ${server.address().port}`)
})
