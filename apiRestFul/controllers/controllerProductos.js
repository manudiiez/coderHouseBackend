const { randomUUID } = require('crypto');

class ContenedorArchivo {

    constructor() {
        this.productos = []
    }


    getAll = (req, res) => {
        res.status(200).json({data: this.productos})
    }

    save = (req, res) => {
        const id = randomUUID();
        const newProducto = {
            ...req.body,
            id: id
        }
        this.productos.push(newProducto)
        res.status(201).json({data: newProducto})
    }

    getById = (req, res) => {
        const id = req.params.id
        const producto = this.productos.find(item => item.id === id);
        if(!producto){
            res.status(404).json({error: `No se encontro ningun producto con el id: ${id}`})
        }
        res.status(200).json({data: producto})
    }

    updateById = (req, res) => {
        const id = req.params.id
        const productoIndex = this.productos.findIndex(item => item.id === id)
        if(productoIndex === -1){
            res.status(404).json({error: `No se encontro ningun producto con el id: ${id}`})
        }
    
        this.productos[productoIndex] = {...req.body, id: id};
        res.status(200).json({message: `Producto ${id} actualizado`})
    }

    deleteById = (req, res) => {
        const id = req.params.id
        const productoIndex = this.productos.findIndex(item => item.id === id)
        if(productoIndex === -1){
            res.status(404).json({error: `No se encontro ningun producto con el id: ${id}`})
        }
        this.productos.splice(productoIndex, 1)
        res.status(200).json({message: `Producto ${id} eliminado`})
    }

}

const contenedor = new ContenedorArchivo()

exports.contenedor = contenedor;
