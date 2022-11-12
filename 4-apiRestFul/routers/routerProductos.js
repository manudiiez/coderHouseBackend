const { Router } = require('express')
// const { getAll, getById, save, updateById, deleteById } = require('../controllers/controllerProductos')
const { ControladorProductos } = require('../controllers/controllerProductos')
const { ContenedorArchivo } = require('../controllers/ContenedorArchivo')

const rutaArchivo = './productos.txt'

const contenedor = new ContenedorArchivo(rutaArchivo)
const controller = new ControladorProductos(contenedor)

const routerProductos = new Router()

routerProductos.get('/', controller.getAll)
routerProductos.get('/:id', controller.getById)
routerProductos.post('/', controller.save)
routerProductos.put('/:id', controller.updateById)
routerProductos.delete('/:id', controller.deleteById)

module.exports = routerProductos  
