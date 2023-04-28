import { Router } from "express"
import { isAuthenticated } from "../utils/authenticated.js"
import ControladorUsuarios from "../controllers/user.controller.js"
import { ContendorUsuariosDAO } from "../persistence/daos/factory.js"


const routerUsers = new Router()
const controllerUsuarios = new ControladorUsuarios(ContendorUsuariosDAO)

routerUsers.post('/', controllerUsuarios.save)

routerUsers.get('/', isAuthenticated, (req, res) => {
    res.status(200).json(req.user)
})

export default routerUsers
