import { Router } from "express"

const router = new Router()

router.get('/', (req, res) => res.render('index'))
router.get('/productos', (req, res) => res.render('index'))
router.post('/productos', (req, res) => res.render('index'))


export default router 