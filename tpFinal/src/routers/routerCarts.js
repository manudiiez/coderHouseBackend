import { Router } from "express"
import { isAuthenticated } from "../utils/authenticated.js"
import { ContendorCarritoDAO } from "../persistence/daos/factory.js"
import ControladorCarrito from "../controllers/carts.controller.js"


const routerCarts = new Router()

const controllerProductos = new ControladorCarrito(ContendorCarritoDAO)

routerCarts.get('/', isAuthenticated, controllerProductos.getAll)
routerCarts.post('/', isAuthenticated, controllerProductos.addProduct)
routerCarts.delete('/:id', isAuthenticated, controllerProductos.removeProduct)

export default routerCarts
