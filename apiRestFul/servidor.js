const routerProductos = require('./routers/routerProductos.js')

const express = require('express')


const app = express()
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

app.use('/api/productos', routerProductos)

function conectar(puerto = 0) {
    return new Promise((resolve, reject) => {
        const servidorConectador = app.listen(puerto, () => {
            resolve(servidorConectador)
        })
        servidorConectador.on("error", error => reject(error))
    })
}

module.exports = { conectar }
