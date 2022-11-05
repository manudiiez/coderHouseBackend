const { Router } = require('express')
// const { getAll, getById, save, updateById, deleteById } = require('../controllers/controllerProductos')
const { contenedor } = require('../controllers/controllerProductos')


const routerProductos = new Router()

routerProductos.get('/', contenedor.getAll)
routerProductos.get('/:id', contenedor.getById)
routerProductos.post('/', contenedor.save)
routerProductos.put('/:id', contenedor.updateById)
routerProductos.delete('/:id', contenedor.deleteById)

module.exports = routerProductos 