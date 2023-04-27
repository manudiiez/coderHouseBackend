import { Router } from "express"
import passport from "passport"
import { isAuthenticated } from "../utils/authenticated.js"
import ControladorUsuarios from "../controllers/user.controller.js"
import { ContendorUsuariosDAO } from "../persistence/daos/factory.js"


const routerUsers = new Router()
const controllerUsuarios = new ControladorUsuarios(ContendorUsuariosDAO)

routerUsers.post('/', passport.authenticate('local-signup', {
    successRedirect: '/success',
    failureRedirect: '/error',
    passReqToCallback: true
}))
// routerUsers.post('/', controllerUsuarios.save)


routerUsers.get('/', isAuthenticated, (req, res) => {
    res.status(200).json(req.user)
})

export default routerUsers
