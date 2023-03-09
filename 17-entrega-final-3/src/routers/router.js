import { Router } from "express"
import passport from "passport"
 

const router = new Router()


// router.post('/login', (req, res, next) => {
//     res.status(201).json({ msg: 'iniciar sesion' })

// })
router.post('/login', passport.authenticate('local-signin', {
    successMessage: 'login exitoso'
}))
router.post('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        // res.redirect('/signin');
        console.log('logout 2s');
    });
    res.status(201).json({ msg: 'sesion cerrada' })
})

export default router
