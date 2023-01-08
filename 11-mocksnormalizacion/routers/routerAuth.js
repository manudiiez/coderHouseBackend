import { Router } from "express"
import auth from "../controllers/controllerAuth.js"

const routerAuth = new Router()

routerAuth.post('/login', auth.login)
routerAuth.post('/logout', auth.logOut)

export default routerAuth 