import { randomUUID } from 'crypto'


class ControladorProductos {

    constructor(contenedor) {
        this.contenedor = contenedor
    }


    getAll = async (req, res) => {
        try {
            res.status(200).json({ data: await this.contenedor.getAll() })
        } catch (error) {
            res.status(404).json({ error: `${error}` })
        } 
    }

    save = async (req, res) => {
        try {
            const id = randomUUID();
            const newProducto = {
                ...req.body,
                id: id
            }
            res.status(201).json({ data: await this.contenedor.save(newProducto) })
        } catch (error) {
            res.status(404).json({ error: `${error}` })
        }
    }

    getById = async (req, res) => {
        try {
            const id = req.params.id
            res.status(200).json({ data: await this.contenedor.getById(id) })
        } catch (error) {
            res.status(404).json({ error: `${error}` })
        }
    }

    updateById = async (req, res) => {
        try {
            const id = req.params.id
            const newBody = req.body
            res.status(200).json({ data: await this.contenedor.updateById(newBody, id) })
        } catch (error) {
            res.status(404).json({ error: `${error}` })
        }
    }

    deleteById = async (req, res) => {
        try {
            const id = req.params.id
            res.status(200).json({ data: await this.contenedor.deleteById(id) })
        } catch (error) {
            res.status(404).json({ error: `${error}` })
        }
    }

}




export default ControladorProductos
