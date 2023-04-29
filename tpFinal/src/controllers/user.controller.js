import { logger } from "../utils/loggers.js"

class ControladorUsuarios {

    constructor(contenedor) {
        this.contenedor = contenedor
    }


    save = async (req, res) => {
        // logger.info(req)
        try {
            const user = await this.contenedor.signup(req.body)
            res.status(200).json(user)
        } catch (error) {
            // logger.error(req, error)
            res.status(404).json({ error: `${error.message}` })
        }
    }
    
    login = async (req, res) => {
        // logger.info(req)
        try {
            const user = await this.contenedor.signin(req.body)
            req.session.user = user
            res.status(200).json(user)
        } catch (error) {
            // logger.error(req, error)
            res.status(404).json({ error: `${error.message}` })
        }
    }


}




export default ControladorUsuarios
