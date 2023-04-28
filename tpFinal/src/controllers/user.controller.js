import { logger } from "../utils/loggers.js"

class ControladorUsuarios {

    constructor(contenedor) {
        this.contenedor = contenedor
    }


    save = async (req, res) => {
        // logger.info(req)
        try {
            const {user, token } = await this.contenedor.signup(req.body)
            res.cookie('access_token', token, {
                httpOnly: true
            })
            res.status(200).json(user)
        } catch (error) {
            // logger.error(req, error)
            res.status(404).json({ error: `${error}` })
        }
    }

    login = async (req, res) => {
        // logger.info(req)
        try {
            const {user, token } = await this.contenedor.signin(req.body)
            res.cookie('access_token', token, {
                httpOnly: true
            })
            res.status(200).json(user)
        } catch (error) {
            // logger.error(req, error)
            res.status(404).json({ error: `${error}` })
        }
    }

   
}




export default ControladorUsuarios
