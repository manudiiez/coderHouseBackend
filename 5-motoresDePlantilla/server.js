const express = require('express')
const { engine } = require('express-handlebars')
const routerProductos = require('./routers/routerProductos.js')
const router = require('./routers/router.js')


const app = express()

/* ------------------------------- MIDDLEWARES ------------------------------ */
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
// app.use('/views', express.static('views'))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

/* --------------------------------- ROUTER --------------------------------- */
app.use('/api/productos', routerProductos)
app.use('/', router)

/* ----------------------------------- APP ---------------------------------- */
const server = app.listen(8080, () => {
    console.log(`Aplicaion en el puerto: ${server.address().port}`)
})
