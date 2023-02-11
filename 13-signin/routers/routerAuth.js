import { Router } from "express"
import passport from "passport"
import ContenedorMongodb from "../containers/ContenedorMongodb.js"
import ControladorAuth from "../controllers/controllerAuth.js"
import User from '../models/User.js'

const routerAuth = new Router()


/* --------------------------------- MONGODB -------------------------------- */
const contenedor = new ContenedorMongodb(User)
const controller = new ControladorAuth(contenedor)

// routerAuth.post('/login', controller.login)
// routerAuth.post('/register', controller.register)
routerAuth.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true
}));
routerAuth.post('/login',
    passport.authenticate('local-signin',
        {
            // en caso de error, no redirige, sino que propaga el error a express!!
            failureMessage: 'logueo fallido'
        }),
    // en caso de éxito, el siguiente controlador maneja la rta al cliente!!
    (req, res) => {
        res.status(201).json({ data: true })
    }
)
routerAuth.get('/logout', controller.logOut)

export default routerAuth   