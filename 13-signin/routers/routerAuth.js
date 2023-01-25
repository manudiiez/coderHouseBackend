import { Router } from "express"
import ContenedorMongodb from "../containers/ContenedorMongodb.js"
import ControladorAuth from "../controllers/controllerAuth.js"
import User from '../models/User.js'

const routerAuth = new Router()


/* --------------------------------- MONGODB -------------------------------- */
const contenedor = new ContenedorMongodb(User)
const controller = new ControladorAuth(contenedor)

routerAuth.post('/login', controller.login)
routerAuth.post('/register', controller.register)
routerAuth.get('/logout', controller.logOut)

export default routerAuth  