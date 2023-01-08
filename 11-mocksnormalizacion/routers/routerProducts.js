import { Router } from "express"
import ControladorProductos from "../controllers/controllerProductos.js"
import ContenedorMysql from "../containers/ContenedorMysql.js"
import auth from "../controllers/controllerAuth.js"
import { clienteSql } from "../utils/client.js"


const routerProducts = new Router()

const contenedor = new ContenedorMysql(clienteSql, 'productos')
const controller = new ControladorProductos(contenedor)

routerProducts.get('/', controller.getAll)
routerProducts.get('/:id', controller.getById)
routerProducts.post('/', auth.isAdmin,  controller.save)
routerProducts.put('/:id', auth.isAdmin, controller.updateById)
routerProducts.delete('/:id', auth.isAdmin, controller.deleteById)

export default routerProducts