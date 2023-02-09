import { Router } from "express"
import passport from "passport"
import ContenedorMongodb from "../containers/ContenedorMongodb.js"
import ControladorAuth from "../controllers/controllerAuth.js"
import User from '../models/User.js'

const routerAuth = new Router()

/* --------------------------------- MONGODB -------------------------------- */
const contenedor = new ContenedorMongodb(User)
const controller = new ControladorAuth(contenedor)


routerAuth.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true
}));
// routerAuth.post('/register',
//     passport.authenticate('local-signup',
//         {
//             // en caso de error, no redirige, sino que propaga el error a express!!
//             failureMessage: 'logueo fallido'
//         }),
//     // en caso de éxito, el siguiente controlador maneja la rta al cliente!!
//     (req, res) => {
//         res.status(201).json({ msg: 'usuario creado' })
//     }
// )


routerAuth.post('/login',
    passport.authenticate('local-signin',
        {
            // en caso de error, no redirige, sino que propaga el error a express!!
            failureMessage: 'logueo fallido'
        }),
    // en caso de éxito, el siguiente controlador maneja la rta al cliente!!
    (req, res) => {
        res.status(201).json({ user: req.user, sessionStart: Date.now() })
    }
)

export default routerAuth 