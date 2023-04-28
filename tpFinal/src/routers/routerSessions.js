import { Router } from "express"
import ControladorUsuarios from "../controllers/user.controller.js"
import { ContendorUsuariosDAO } from "../persistence/daos/factory.js"


const routerSessions = new Router()
const controllerUsuarios = new ControladorUsuarios(ContendorUsuariosDAO)


routerSessions.post('/', controllerUsuarios.login)



export default routerSessions
