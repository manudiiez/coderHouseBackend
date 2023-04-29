import { Router } from "express"
import { isAdmin, isAuthenticated } from "../utils/authenticated.js"
import { ContendorProductosDAO } from "../persistence/daos/factory.js"
import ControladorProductos from "../controllers/products.controller.js"


const routerProducts = new Router()

const controllerProductos = new ControladorProductos(ContendorProductosDAO)

routerProducts.get('/', controllerProductos.getAll)
routerProducts.post('/', isAdmin, controllerProductos.save)
routerProducts.get('/:PRODUCT_ID', controllerProductos.getById)
routerProducts.put('/:PRODUCT_ID', isAdmin, controllerProductos.updateById)
routerProducts.delete('/:PRODUCT_ID', isAdmin, controllerProductos.deleteById)

export default routerProducts
