import { Router } from "express"

const router = new Router()

router.get('/', (req ,res) => {
    res.render('index')
})

router.post('/', (req ,res) => {
    console.log(req.body);
    res.json({
        data: false,
        message: 'error',
        url: '/'
    })
    // res.redirect('error', {
    //     message: req.body.error,
    //     url: req.body.url
    // })
    // res.redirect('/error')
})
router.get('/error', (req ,res) => {
    console.log('error');
    res.render('error')
})
router.get('/chat', (req ,res) => {
    res.render('chat')
})
router.get('/login', (req ,res) => {
    res.render('login')
})
router.get('/register', (req ,res) => {
    res.render('register')
})

export default router 
