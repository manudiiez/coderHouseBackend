import { logger } from "../utils/loggers.js"

class ControladorProductos {

    constructor(contenedor) {
        this.contenedor = contenedor
    }


    getAll = async (req, res) => {
        logger.info(req)
        try {
            res.status(200).json({ data: await this.contenedor.getAll() })
        } catch (error) {
            logger.error(req, error)
            res.status(404).json({ error: `${error}` })
        } 
    }

    getAllView = async (req, res, next) => {
        logger.info(req)
        try {
            req.productos = await this.contenedor.getAll()
            next()
        } catch (error) {
            logger.error(req, error)
            res.status(404).json({ error: `${error}` })
        } 
    }

    save = async (req, res) => {
        logger.info(req)
        try {
            res.status(201).json({ data: await this.contenedor.save(req.body) })
        } catch (error) {
            logger.error(req, error)
            res.status(404).json({ error: `${error}` })
        }
    }
    
    getById = async (req, res) => {
        logger.info(req)
        try {
            const id = req.params.PRODUCT_ID
            res.status(200).json({ data: await this.contenedor.getById(id) })
        } catch (error) {
            logger.error(req, error)
            res.status(404).json({ error: `${error}` })
        }
    }
    
    updateById = async (req, res) => {
        logger.info(req)
        try {
            const id = req.params.PRODUCT_ID
            const newBody = req.body
            res.status(200).json({ data: await this.contenedor.updateById(id, newBody) })
        } catch (error) {
            logger.error(req, error)
            res.status(404).json({ error: `${error}` })
        }
    }
     
    deleteById = async (req, res) => {
        logger.info(req)
        try {
            const id = req.params.PRODUCT_ID
            res.status(200).json({ data: await this.contenedor.deleteById(id) })
        } catch (error) {
            logger.error(req, error)
            res.status(404).json({ error: `${error}` })
        }
    }

}




export default ControladorProductos
