import { Router } from "express"
import passport from "passport"
/* -------------------------------- PRODUCTS -------------------------------- */
import ControladorProductosView from "../controllers/controllerProductsView.js"
import ContenedorMongodb from "../containers/ContenedorMongodb.js"
import Product from '../models/Product.js'


/* -------------------------------- PRODUCTS -------------------------------- */
const contenedorProductos = new ContenedorMongodb(Product)
const controllerProductos = new ControladorProductosView(contenedorProductos)

const router = new Router()

// VISTAS SIN PROTECCION
router.get('/signup', (req, res, next) => {
    res.render('signup')
})
router.get('/signin', (req, res, next) => {
    res.render('signin')
})
router.get('/error', (req, res, next) => {
    res.render('error')
})

router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        // res.redirect('/signin');
        console.log('logout 2s');
    });
    res.render('logout')
})


// INFO
router.get('/info', (req, res, next) => {
    res.render('info', getData())
})


// LOGIN

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/error',
    passReqToCallback: true
}))
router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/error',
    passReqToCallback: true
}))

// VISTAS PROTEGIDAS
router.get('/', isAuthenticated,controllerProductos.getAll, (req, res, next) => {
    res.render('index', {
        products: req.productos,
    })
})

function isAuthenticated (req, res, next){
    if(req.isAuthenticated()){
        return next()
    }else{
        res.redirect('/signin')
    }
}

function getData() {
    const folderArray = process.cwd().split('\\')
    const objectData = {
        inputArguments:  process.argv.splice(2),
        NodeVersion: process.version,
        os: process.platform,
        RSS: process.memoryUsage().rss,
        EjecutionPath: process.cwd(),
        processId: process.pid,
        projectFolder: folderArray[folderArray.length - 1],
    }
    return objectData
}

export default router
