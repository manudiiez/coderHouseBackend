import passport from 'passport';
import { Strategy as LocalStrategy } from "passport-local";
import { ContendorUsuariosDAO } from '../daos/factory.js';

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const user = await ContendorUsuariosDAO.getById(id);
    done(null, user);
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        const result = await ContendorUsuariosDAO.signup(req.body)
        done(null, result);
    } catch (error) {
        return done(null, false, req.flash('signupMessage', error.message));
    }
}));

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {

    try {
        const result = await ContendorUsuariosDAO.signin(req.body)
        done(null, result);
    } catch (error) {
        return done(null, false, req.flash('signinMessage', error.message));
    }
}));
