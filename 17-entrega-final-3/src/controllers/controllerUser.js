import { logger } from '../loggers/loggers.js'

class ControladorUsuario {

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


}




export default ControladorUsuario
