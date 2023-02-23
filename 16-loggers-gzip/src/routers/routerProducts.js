import { Router } from "express"
import ControladorProductos from "../controllers/controllerProductos.js"
import Product from '../models/Product.js'
/* ------------------------------- CONTENEDOR ------------------------------- */
import ContenedorMongodb from "../containers/ContenedorMongodb.js"

const routerProducts = new Router()

/* --------------------------------- MONGODB -------------------------------- */
export const contenedorProductos = new ContenedorMongodb(Product)
const controller = new ControladorProductos(contenedorProductos)

routerProducts.get('/', controller.getAll)
routerProducts.get('/:id', controller.getById)
routerProducts.post('/',  controller.save)
routerProducts.put('/:id', controller.updateById)
routerProducts.delete('/:id', controller.deleteById)

export default routerProducts

