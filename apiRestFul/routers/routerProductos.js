const { Router } = require('express')

const routerProductos = new Router()

routerProductos.get('/', getAll)
routerProductos.get('/:id', getById)
routerProductos.post('/', save)
routerProductos.put('/:id', updateById)
routerProductos.delete('/:id', deleteById)

module.exports = routerProductos