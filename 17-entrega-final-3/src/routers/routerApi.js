import { Router } from "express"
import passport from "passport"
/* ------------------------------ CONTENEDORES ------------------------------ */
import ContenedorMongodb from "../containers/ContenedorMongodb.js"
/* ------------------------------ CONTROLADORES ----------------------------- */
import ControladorProductos from "../controllers/controllerProductos.js"
import ControladorCarrito from "../controllers/controllerCart.js"
/* --------------------------------- MODELOS -------------------------------- */
import Product from '../models/Product.js'
import User from '../models/User.js'

 
const routerApi = new Router()
let carrito = []

/* ------------------------------ CONTENEDORES ------------------------------ */
const contenedorProductos = new ContenedorMongodb(Product)
const contenedorUsuarios = new ContenedorMongodb(User)
/* ------------------------------ CONTROLADORES ----------------------------- */
const controllerProductos = new ControladorProductos(contenedorProductos)
const controllerCarritos = new ControladorCarrito(contenedorUsuarios)

/* ----------------------------- AUTHENTICATION ----------------------------- */

routerApi.post('/users', passport.authenticate('local-signup', {
    successMessage: 'registro exitoso',
    failureMessage: 'error al registrar'
}))
    
routerApi.get('/userinfo', (req, res, next) => {
    // logger.info(req)
    console.log(req.user)
    res.status(201).json({ user: req.user })
})


/* -------------------------------- PRODUCTS -------------------------------- */
routerApi.get('/products', controllerProductos.getAll)

routerApi.post('/products', controllerProductos.save)

routerApi.get('/products/:PRODUCT_ID', controllerProductos.getById)

routerApi.put('/products/:PRODUCT_ID', controllerProductos.updateById)

routerApi.delete('/products/:PRODUCT_ID', controllerProductos.deleteById)

/* ------------------------------ SHOPPINGCART ------------------------------ */

routerApi.get('/shoppingcartproducts', controllerCarritos.getAll)

routerApi.post('/shoppingcartproducts',  controllerCarritos.save)

routerApi.delete('/shoppingcartproducts/:PRODUCT_ID', (req, res, next) => {
    const PRODUCT_ID = req.params.PRODUCT_ID
    const i = carrito.indexOf(PRODUCT_ID);
    if (i !== -1) {
        carrito.splice(i, 1);
    }
    res.status(201).json({ data: carrito  })
})

routerApi.delete('/shoppingcartproducts', (req, res, next) => {
    carrito = []
    res.status(201).json({ data: carrito  })
})

export default routerApi





