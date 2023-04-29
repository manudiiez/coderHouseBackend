import { logger } from "../utils/loggers.js"

class ControladorOrdenes {

    constructor(contenedor) {
        this.contenedor = contenedor
    }


    getAll = async (req, res) => {
        // logger.info(req)
        try {
            res.status(200).json(await this.contenedor.getAll())
        } catch (error) {
            // logger.error(req, error)
            res.status(404).json({ error: `${error}` })
        }
    }

    newOrder = async (req, res) => {
        // logger.info(req)
        try {
            res.status(200).json(await this.contenedor.newOrder(req))
        } catch (error) {
            // logger.error(req, error)
            res.status(404).json({ error: `${error}` })
        }
    }

    

}



export default ControladorOrdenes
