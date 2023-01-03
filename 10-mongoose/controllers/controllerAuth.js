import { randomUUID } from 'crypto'


class ControladorAuth {

    constructor() {
        this.admin = false
    }

    login = async (req, res) => {
        this.admin = true
        res.status(200).json({ admin: this.admin })
    }

    logOut = async (req, res) => {
        this.admin = false
        res.status(200).json({ admin: this.admin })
    }

    isAdmin = (req, res, next) => {
        if (this.admin) {
            next()
        } else {
            res.status(403).json({
                error: -1, 
                descripcion: "ruta y método no autorizados"
            })
        }
    }


}


const auth = new ControladorAuth()

export default auth
