import { Router } from "express"
import passport from "passport"
/* ------------------------------ CONTROLADORES ----------------------------- */
import ControladorProductos from "../controllers/controllerProductos.js"
import ControladorCarrito from "../controllers/controllerCart.js"
import ControladorOrdenes from "../controllers/controllerOrder.js"
/* ---------------------------------- DAOS ---------------------------------- */
import { ContendorOrdersDAO, ContendorProductosDAO, ContendorUsuariosDAO } from "../persistence/daos/factory.js"

  
const routerApi = new Router()

/* ------------------------------ CONTROLADORES ----------------------------- */
const controllerProductos = new ControladorProductos(ContendorProductosDAO)
const controllerCarritos = new ControladorCarrito(ContendorUsuariosDAO, ContendorProductosDAO)
const controllerOrdenes = new ControladorOrdenes(ContendorOrdersDAO, ContendorUsuariosDAO)

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





