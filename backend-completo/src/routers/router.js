import { Router } from "express"
import passport from "passport"
 

const router = new Router()

router.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/error'
}))
router.post('/logout', isAuthenticated, (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        // res.redirect('/signin');
        console.log('logout 2s');
    });
    res.status(201).json({ msg: 'sesion cerrada' })
})

function isAuthenticated (req, res, next){
    if(req.isAuthenticated()){
        return next()
    }else{
        res.redirect('/signin')
    }
}

export default router
