const { Router } = require('express')
const { getAll, getById, save, updateById, deleteById } = require('../controllers/controllerProductos')

const productos = []



const routerProductos = new Router()

routerProductos.get('/', getAll)
routerProductos.get('/:id', getById)
routerProductos.post('/', save)
routerProductos.put('/:id', updateById)
routerProductos.delete('/:id', deleteById)

module.exports = routerProductos