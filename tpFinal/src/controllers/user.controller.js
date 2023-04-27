import { logger } from "../utils/loggers.js"

class ControladorUsuarios {

    constructor(contenedor) {
        this.contenedor = contenedor
    }


    save = async (req, res) => {
        // logger.info(req)
        try {
            res.status(200).json(await this.contenedor.signup(req.body))
        } catch (error) {
            // logger.error(req, error)
            res.status(404).json({ error: `${error}` })
        }
    }

   
}




export default ControladorUsuarios
