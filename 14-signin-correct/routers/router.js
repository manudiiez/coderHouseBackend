import { Router } from "express"
import ContenedorMongodb from "../containers/ContenedorMongodb.js"

/* --------------------------------- MODELS --------------------------------- */
import ControladorAuth from "../controllers/controllerAuth.js"

/* --------------------------------- MONGODB -------------------------------- */

const auth = new ControladorAuth()


const router = new Router()

router.get('/', (req, res) => {
    res.render('index')
})
router.post('/', (req, res) => {
    res.render('index')
})
router.get('/login', (req, res) => {
    res.render('login')
})
router.get('/register', (req, res) => {
    res.render('register')
})
router.post('/register', (req, res) => {
    res.render('register')
})
router.get('/error', (req, res) => {
    res.render('error')
})


export default router 

 