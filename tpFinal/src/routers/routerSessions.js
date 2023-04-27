import { Router } from "express"
import passport from "passport"


const routerSessions = new Router()



routerSessions.post('/', passport.authenticate('local-signin', {
    successRedirect: '/success',
    failureRedirect: '/error',
    passReqToCallback: true
}))

export default routerSessions
