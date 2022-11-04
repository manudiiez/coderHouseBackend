const { randomUUID } = require('crypto');

const productos = []

const getAll = (req, res) => {
    res.status(200).json({data: productos})
}
const getById = (req, res) => {
    const id = req.params.id
    const producto = productos.find(item => item.id === id);
    if(!producto){
        res.status(404).json({menssage: `No se encontro ningun producto con el id: ${id}`})
    }
    res.status(200).json({data: producto})
}
const save = (req, res) => {
    const id = randomUUID();
    const newProducto = {
        ...req.body,
        id: id
    }
    productos.push(newProducto)
    res.status(201).json({data: newProducto})
}
const updateById = (req, res) => {
    const id = req.params.id
    const productoIndex = productos.findIndex(item => item.id === id)
    if(productoIndex === -1){
        res.status(404).json({menssage: `No se encontro ningun producto con el id: ${id}`})
    }

    productos[productoIndex] = {...req.body, id: id};
    res.status(200).json({message: `Producto ${id} actualizado`})
}
const deleteById = (req, res) => {
    const id = req.params.id
    const productoIndex = productos.findIndex(item => item.id === id)
    if(productoIndex === -1){
        res.status(404).json({menssage: `No se encontro ningun producto con el id: ${id}`})
    }
    productos.splice(productoIndex, 1)
    res.status(200).json({message: `Producto ${id} eliminado`})
}

exports.getAll = getAll;
exports.getById = getById;
exports.save = save;
exports.updateById = updateById;
exports.deleteById = deleteById;
