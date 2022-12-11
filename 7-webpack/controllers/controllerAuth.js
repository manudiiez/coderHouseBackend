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
            console.log(req.route.path);
            console.log(req.route.stack[1].name);
            res.status(403).json({
                error: -1, 
                descripcion: `ruta ${req.route.path} y método ${req.route.stack[1].method} no autorizados`
            })
        }
    }


}


const auth = new ControladorAuth()

export default auth
