import { Router } from "express"
import passport from "passport"
import ContenedorMongodb from "../containers/ContenedorMongodb.js"
import ControladorAuth from "../controllers/controllerAuth.js"
import User from '../models/User.js'

const routerAuth = new Router()


/* --------------------------------- MONGODB -------------------------------- */
const contenedor = new ContenedorMongodb(User)
const controller = new ControladorAuth(contenedor)

routerAuth.post('/signup', controller.signUp)
routerAuth.get('/', controller.getAll)
routerAuth.get('/:id', controller.getById)
routerAuth.put('/:id', controller.updateById)


export default routerAuth   