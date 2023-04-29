import { logger } from "../utils/loggers.js"

class ControladorProductos {

    constructor(contenedor) {
        this.contenedor = contenedor
    }


    getAll = async (req, res) => {
        logger.info(req)
        try {
            res.status(200).json(await this.contenedor.getAll())
        } catch (error) {
            logger.error(req, error)
            res.status(404).json({ error: `${error}` })
        }
    } 

    save = async (req, res) => {
        logger.info(req)
        try {
            res.status(201).json(await this.contenedor.save(req.body))
        } catch (error) {
            logger.error(req, error)
            res.status(404).json({ error: `${error.message}` })
        }
    }

    getById = async (req, res) => {
        logger.info(req)
        try {
            const id = req.params.PRODUCT_ID
            res.status(200).json(await this.contenedor.getById(id))
        } catch (error) {
            logger.error(req, error)
            res.status(404).json({ error: `No se encontro un producto con ese ID` })

        }
    }

    updateById = async (req, res) => {
        logger.info(req)
        try {
            const id = req.params.PRODUCT_ID
            const newBody = req.body
            res.status(200).json(await this.contenedor.updateById(id, newBody))
        } catch (error) {
            logger.error(req, error)
            res.status(404).json({ error: `No se encontro un producto con ese ID` })
        }
    }
    
    deleteById = async (req, res) => {
        logger.info(req)
        try {
            const id = req.params.PRODUCT_ID
            await this.contenedor.deleteById(id)
            res.status(200).json( `Producto ${id} eliminado` )
        } catch (error) {
            logger.error(req, error)
            res.status(404).json({ error: `No se encontro un producto con ese ID` })
        }
    }

}




export default ControladorProductos
