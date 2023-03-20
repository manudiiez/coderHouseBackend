import { Router } from "express"
import passport from "passport"
/* ------------------------------ CONTROLADORES ----------------------------- */
import ControladorProductos from "../controllers/controllerProductos.js"
import ControladorCarrito from "../controllers/controllerCart.js"
/* ---------------------------------- DAOS ---------------------------------- */
import { ContendorProductosDAO, ContendorUsuariosDAO } from '../persistence/daos/factory.js'

const router = new Router()


/* ------------------------------ CONTROLADORES ----------------------------- */
const controllerProductos = new ControladorProductos(ContendorProductosDAO)
const controllerCarritos = new ControladorCarrito(ContendorUsuariosDAO, ContendorProductosDAO)

/* ---------------------------------- VIEWS --------------------------------- */

router.get('/', isAuthenticated, controllerProductos.getAllView, (req, res, next) => {
    res.render('index', {
        products: req.productos,
    })
})
router.get('/carrito', isAuthenticated, controllerCarritos.getAllView, (req, res, next) => {
    res.render('carrito', {
        cart: req.carrito,
    })
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.get('/signin', (req, res, next) => {
    res.render('signin')
})

router.get('/error', (req, res, next) => {
    res.render('error')
})

router.get('/logout', isAuthenticated, (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
    });
    res.render('logout')
})

/* ---------------------------------- POST ---------------------------------- */

router.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/error',
    passReqToCallback: true
}))
router.post('/logout', isAuthenticated, (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
    });
    res.status(201).json({ msg: 'sesion cerrada' })
})


function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        res.redirect('/signin')
    }
}

export default router
