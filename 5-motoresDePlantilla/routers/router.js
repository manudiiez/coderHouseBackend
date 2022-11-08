const { Router } = require('express')
// const { getAll, getById, save, updateById, deleteById } = require('../controllers/controllerProductos')
const { contenedor } = require('../controllers/controllerProductos')


const router = new Router()

router.get('/',(req, res) => {
    res.render('index')
})
router.get('/productos', contenedor.getAll, (req, res) => {

    res.render('listProducts', {
        isEmpty: req.productos.length === 0 ? false : true,
        productos: req.productos
    })
})

module.exports = router 