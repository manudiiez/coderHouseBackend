import { Router } from "express"
import ControladorCart from "../controllers/controllerCart.js"
import ContenedorMongodb from "../containers/ContenedorMongodb.js"
import Product from '../models/Product.js'
import Cart from '../models/Cart.js'

const routerCart = new Router()

const contenedor = new ContenedorMongodb(Cart)
const contenedorProducts = new ContenedorMongodb(Product)
const controller = new ControladorCart(contenedor, contenedorProducts)

routerCart.post('/', controller.create)
routerCart.delete('/:id_cart', controller.deleteAllProducts)
routerCart.post('/:id_cart/products', controller.save)
routerCart.get('/:id_cart/products', controller.getAllProducts)
routerCart.get('/', controller.getAll)
routerCart.delete('/:id_cart/products/:id_prod', controller.deleteOneProduct)

export default routerCart