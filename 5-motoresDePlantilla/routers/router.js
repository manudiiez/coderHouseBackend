const { Router } = require('express')
// const { getAll, getById, save, updateById, deleteById } = require('../controllers/controllerProductos')
const { contenedor } = require('../controllers/controllerProductos')


const router = new Router()

router.get('/', (req, res) => {
    res.render('index', {title: 'Hola index'})
})
router.get('/productos', contenedor.getAll,(req, res) => {
    const productos = [
        'buzo',
        'campera',
        'remera'
    ]
    res.render('listProducts', {
        isEmpty: productos.length === 0 ? false : true,
        productos: contenedor.productos
    })
    // res.render('listProducts', {data: req.data})
})

module.exports = router 