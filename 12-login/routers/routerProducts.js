import { Router } from "express"
import ControladorProductos from "../controllers/controllerProductos.js"
import auth from "../controllers/controllerAuth.js"
import Product from '../models/Product.js'
/* ------------------------------- CONTENEDOR ------------------------------- */
import ContenedorMongodb from "../containers/ContenedorMongodb.js"
import { ContenedorFirebase } from "../containers/ContenedorFirebase.js"

const routerProducts = new Router()

/* -------------------------------- FIREBASE -------------------------------- */
// const contenedor = new ContenedorFirebase('products')

/* --------------------------------- MONGODB -------------------------------- */
const contenedor = new ContenedorMongodb(Product)

const controller = new ControladorProductos(contenedor)

routerProducts.get('/', controller.getAll)
routerProducts.get('/:id', controller.getById)
routerProducts.post('/',  controller.save)
routerProducts.put('/:id', controller.updateById)
routerProducts.delete('/:id', controller.deleteById)

export default routerProducts