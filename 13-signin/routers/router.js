import { Router } from "express"
import ControladorChatView from "../controllers/controllerChatView.js"
import ControladorProductosView from "../controllers/controllerProductsView.js"
import ContenedorMongodb from "../containers/ContenedorMongodb.js"
import { ContenedorFirebase } from "../containers/ContenedorFirebase.js"

/* --------------------------------- MODELS --------------------------------- */
import Product from "../models/Product.js"
import Chat from "../models/Chat.js"
import ControladorAuth from "../controllers/controllerAuth.js"

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

const auth = new ControladorAuth()


const router = new Router()

router.get('/', auth.isAuthenticated, controllerProductos.getAll, (req, res) => {
    console.log(req.session.user);
    res.render('index', {
        isEmpty: req.productos.length === 0 ? false : true,
        productos: req.productos,
        user: req.session.user
    })
})

router.get('/firebase/test', controllerProductos.getAll, (req, res) => {
    res.render('index', {
        isEmpty: req.productos.length === 0 ? false : true,
        productos: req.productos,
        user: req.session.user
    })
})

router.get('/chat', auth.isAuthenticated ,controllerChat.getAll, (req, res) => {

    res.render('chat', {
        isEmpty: req.chat.length === 0 ? false : true,
        productos: req.chat,
        user: req.session.user
    })
})

router.get('/login', (req, res) => {
    res.render('login')
})
router.get('/register', (req, res) => {
    res.render('register')
})
router.get('/errorLogin', (req, res) => {
    res.render('errorLogin')
})
router.get('/errorRegister', (req, res) => {
    res.render('errorRegister')
})
router.get('/logout', auth.isAuthenticated, async(req, res) => {
    res.render('logout', {
        user: req.session.user
    })
    // auth.logOut(req, res)
})

router.post('/productos', controllerProductos.save)
router.post('/chat', controllerChat.save)



export default router 

export { contenedorProductos, contenedorChat }

