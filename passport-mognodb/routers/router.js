import { Router } from "express"
import passport from "passport";

const routerAuth = new Router()


routerAuth.post('/signup',
    passport.authenticate('local-signup',
        {
            // en caso de error, no redirige, sino que propaga el error a express!!
            failureMessage: 'logueo fallido'
        }),
    // en caso de éxito, el siguiente controlador maneja la rta al cliente!!
    (req, res) => {
        res.status(201).json({ msg: 'usuario creado' })
    }
)


routerAuth.post('/signin',
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