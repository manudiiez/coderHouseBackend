import { Router } from "express"
import ContenedorArchivo from "../controllers/ContenedorArchivo.js"
import ControladorProductos from "../controllers/controllerProductos.js"
import auth from "../controllers/controllerAuth.js"

const rutaArchivo = './productos.txt'

const routerProducts = new Router()

const contenedor = new ContenedorArchivo(rutaArchivo)
const controller = new ControladorProductos(contenedor)

routerProducts.get('/', controller.getAll)
routerProducts.get('/:id', controller.getById)
routerProducts.post('/', auth.isAdmin,  controller.save)
routerProducts.put('/:id', auth.isAdmin, controller.updateById)
routerProducts.delete('/:id', auth.isAdmin, controller.deleteById)

export default routerProducts