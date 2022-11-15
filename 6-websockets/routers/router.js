const { Router } = require('express')
const { ControladorProductos } = require('../controllers/controllerProductos')
const { ContenedorArchivo } = require('../controllers/ContenedorArchivo')

const rutaArchivo = './productos.txt'

const contenedor = new ContenedorArchivo(rutaArchivo)
const controller = new ControladorProductos(contenedor)


const router = new Router()

router.get('/', controller.getAll, (req, res) => {
    res.render('index', {
        isEmpty: req.productos.length === 0 ? false : true,
        productos: req.productos
    })
})
router.post('/productos', controller.save)

module.exports = router 