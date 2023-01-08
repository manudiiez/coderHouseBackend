import { Router } from "express"
import ControladorCart from "../controllers/controllerCart.js"
import ContenedorArchivo from '../containers/ContenedorArchivo.js'

const rutaArchivo = './cart.txt'
const rutaProductos = './productos.txt'

const routerCart = new Router()

const contenedor = new ContenedorArchivo(rutaArchivo)
const contenedorProducts = new ContenedorArchivo(rutaProductos)
const controller = new ControladorCart(contenedor, contenedorProducts)

routerCart.post('/', controller.create)
routerCart.delete('/:id_cart', controller.deleteAllProducts)
routerCart.post('/:id_cart/products', controller.save)
routerCart.get('/:id_cart/products', controller.getAllProducts)
routerCart.delete('/:id_cart/products/:id_prod', controller.deleteOneProduct)

export default routerCart