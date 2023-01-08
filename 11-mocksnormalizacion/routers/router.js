import { Router } from "express"
import { ContenedorFirebase } from "../../10-mongoose/containers/ContenedorFirebase.js"
import ContenedorMysql from "../containers/ContenedorMysql.js"
import ControladorChatView from "../controllers/controllerChatView.js"
import ControladorProductosView from "../controllers/controllerProductsView.js"
import { clienteSql } from "../utils/client.js"

const contenedorProductos = new ContenedorMysql(clienteSql, 'productos')
const controllerProductos = new ControladorProductosView(contenedorProductos)
// const contenedorChat = new ContenedorMysql(clienteSql, 'chat')
const contenedorChat = new ContenedorFirebase('chat')
const controllerChat = new ControladorChatView(contenedorChat)

const router = new Router()

router.get('/', controllerProductos.getAll, (req, res) => {
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