import { logger } from "../utils/loggers.js"

class ControladorCarrito {

    constructor(contenedor) {
        this.contenedor = contenedor
    }


    getAll = async (req, res) => {
        // logger.info(req)
        try {
            res.status(200).json(await this.contenedor.getUserCart(req.user.idCart))
        } catch (error) {
            // logger.error(req, error)
            res.status(404).json({ error: `${error}` })
        }
    }

    addProduct = async (req, res) => {
        // logger.info(req)
        try {
            res.status(200).json(await this.contenedor.add(req))
        } catch (error) {
            // logger.error(req, error)
            res.status(404).json({ error: `${error}` })
        }
    }

    removeProduct = async (req, res) => {
        // logger.info(req)
        try {
            res.status(200).json(await this.contenedor.remove(req))
        } catch (error) {
            // logger.error(req, error)
            res.status(404).json({ error: `${error}` })
        }
    }

    

}




export default ControladorCarrito
