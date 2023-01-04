import { Router } from "express"
import ControladorChatView from "../controllers/controllerChatView.js"
import ControladorProductosView from "../controllers/controllerProductsView.js"
import ContenedorMongodb from "../containers/ContenedorMongodb.js"
import { ContenedorFirebase } from "../containers/ContenedorFirebase.js"
/* --------------------------------- MODELS --------------------------------- */
import Product from "../models/Product.js"
import Chat from "../models/Chat.js"

/* ---------------------------------- MYSQL --------------------------------- */
// const contenedorChat = new ContenedorMysql(clienteSql, 'chat')

/* -------------------------------- FIREBASE -------------------------------- */
// const contenedorProductos = new ContenedorFirebase('products')
// const contenedorChat = new ContenedorFirebase('chat')

/* --------------------------------- MONGODB -------------------------------- */
const contenedorProductos = new ContenedorMongodb(Product)
const contenedorChat = new ContenedorMongodb(Chat)

const controllerProductos = new ControladorProductosView(contenedorProductos)
const controllerChat = new ControladorChatView(contenedorChat)

const router = new Router()

router.get('/', controllerProductos.getAll, (req, res) => {
    res.render('index', {
        isEmpty: req.productos.length === 0 ? false : true,
        productos: req.productos
    })
})

router.get('/firebase/test', controllerProductos.getAll, (req, res) => {
    res.render('index', {
        isEmpty: req.productos.length === 0 ? false : true,
        productos: req.productos
    })
})

router.get('/chat', controllerChat.getAll, (req, res) => {
    res.render('chat', {
        isEmpty: req.chat.length === 0 ? false : true,
        productos: req.chat
    })
})

router.post('/productos', controllerProductos.save)
router.post('/chat', controllerChat.save)



export default router 

export { contenedorProductos, contenedorChat }