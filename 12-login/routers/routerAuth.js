import { Router } from "express"
import auth from "../controllers/controllerAuth.js"

const routerAuth = new Router()

routerAuth.get('/login', auth.login)
routerAuth.get('/logout', auth.logOut)

export default routerAuth 