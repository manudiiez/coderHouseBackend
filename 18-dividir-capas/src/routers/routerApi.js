import { Router } from "express"
import passport from "passport"
/* ------------------------------ CONTENEDORES ------------------------------ */
import ContenedorMongodb from "../persistence/containers/ContenedorMongodb.js"
import cartDao from "../persistence/daos/cartDao.js"
import orderDao from "../persistence/daos/orderDao.js"
/* ------------------------------ CONTROLADORES ----------------------------- */
import ControladorProductos from "../controllers/controllerProductos.js"
import ControladorCarrito from "../controllers/controllerCart.js"
import ControladorOrdenes from "../controllers/controllerOrder.js"
/* --------------------------------- MODELOS -------------------------------- */
import Product from '../persistence/models/Product.js'
import User from '../persistence/models/User.js'
import Orders from "../persistence/models/Orders.js"

 
const routerApi = new Router()

/* ------------------------------ CONTENEDORES ------------------------------ */
const contenedorProductos = new ContenedorMongodb(Product)
const contenedorUsuarios = new cartDao(User)
const contenedorOrdenes = new orderDao(Orders)
/* ------------------------------ CONTROLADORES ----------------------------- */
const controllerProductos = new ControladorProductos(contenedorProductos)
const controllerCarritos = new ControladorCarrito(contenedorUsuarios)
const controllerOrdenes = new ControladorOrdenes(contenedorOrdenes, contenedorUsuarios)

/* ----------------------------- AUTHENTICATION ----------------------------- */

routerApi.post('/users', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/error',
    passReqToCallback: true
}))
    
routerApi.get('/users/info', isAuthenticated, (req, res) => {
    res.status(200).json(req.user)
    
})
    
/* -------------------------------- PRODUCTS -------------------------------- */
routerApi.get('/products', isAuthenticated, controllerProductos.getAll)

routerApi.post('/products', isAdmin, controllerProductos.save)

routerApi.get('/products/:PRODUCT_ID', isAuthenticated, controllerProductos.getById)

routerApi.put('/products/:PRODUCT_ID', isAdmin, controllerProductos.updateById)

routerApi.delete('/products/:PRODUCT_ID', isAdmin, controllerProductos.deleteById)

/* ------------------------------ SHOPPINGCART ------------------------------ */

routerApi.get('/shoppingcartproducts', isAuthenticated, controllerCarritos.getAll)

routerApi.post('/shoppingcartproducts',  isAuthenticated, controllerCarritos.save)

routerApi.delete('/shoppingcartproducts/:PRODUCT_ID', isAuthenticated, controllerCarritos.deleteById)

routerApi.delete('/shoppingcartproducts', controllerCarritos.delete)

/* --------------------------------- ORDERS --------------------------------- */

routerApi.get('/orders', isAdmin, controllerOrdenes.getAll)

routerApi.post('/orders', isAuthenticated, controllerOrdenes.save)

routerApi.get('/orders/:USER_ID', isAuthenticated, controllerOrdenes.getByUser)

routerApi.delete('/orders/:ORDER_ID', isAuthenticated, controllerOrdenes.delete)


function isAuthenticated (req, res, next){
    if(req.isAuthenticated()){
        return next()
    }else{
        res.json({error: "Debe autenticarse para poder acceder a esta funciones"})
    }
}

function isAdmin (req, res, next){
    if(req.isAuthenticated() && req.user.role === 'admin'){
        return next()
    }else{
        res.json({error: "Usted no tiene el acceso permitido a estas funciones"})
    }
}

export default routerApi





