import express from 'express'
import {engine} from 'express-handlebars'
import routerProducts from './routers/routerProducts.js'
import routerAuth from './routers/routerAuth.js'
import routerCart from './routers/routerCart.js'
import routerChat from './routers/routerChat.js'
import router from './routers/router.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

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
    console.log(req);
    res.status(404).json( { error : -2, descripcion:`ruta '${req.url}' método '${req.method}' no implementada`})
})


const server = app.listen(process.env.PORT || 8080, () => {
    console.log(`Aplicaion en el puerto: ${server.address().port}`)
})
 