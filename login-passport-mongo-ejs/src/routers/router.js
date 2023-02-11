import { Router } from "express"
import passport from "passport"

const router = new Router()

router.get('/', (req, res, next) => {
    res.render('index')
})
router.get('/signup', (req, res, next) => {
    res.render('signup')
})
router.get('/signin', (req, res, next) => {
    res.render('signin')
})
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}))
router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
}))

router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
})


// RUTAS PROTEGIDAS

// Otra forma de proteger rutas es hacer un midleware protegido y poner las rutas despues
router.use((req, res, next) => {
    isAuthenticated(req, res, next)
    next()
})

router.get('/profile', (req, res, next) => {
    res.render('profile')
})

function isAuthenticated (req, res, next){
    if(req.isAuthenticated()){
        return next()
    }else{
        res.redirect('/')
    }
}

export default router

