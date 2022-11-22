const { Router } = require('express')
const { ControladorProductos } = require('../controllers/controllerProductos')
const { ContenedorArchivo } = require('../controllers/ContenedorArchivo')
const { ControladorChat } = require('../controllers/controllerChat')

const contenedorProductos = new ContenedorArchivo('./productos.txt')
const controllerProductos = new ControladorProductos(contenedorProductos)
const contenedorChat = new ContenedorArchivo('./chat.txt')
const controllerChat = new ControladorChat(contenedorChat)


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

exports.contenedorProductos = contenedorProductos;
exports.controllerChat = controllerChat;
exports.contenedorChat = contenedorChat;
exports.router = router;