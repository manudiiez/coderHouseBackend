
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import User from '../models/User.js'

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ 'email': email })
    console.log(user)
    if (user) {
        console.log('ese usuario ya existe')
        // return done(null, false);
        return done(null, false, req.flash('signupMessage', 'The Email is already Taken.'));
    } else {
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        console.log(newUser)
        await newUser.save();
        done(null, newUser);
    }
}));

 
passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ email: email });
    if (!user) {
        // return done(null, false);
        return done(null, false, req.flash('signinMessage', 'No User Found'));
    }
    if (!user.comparePassword(password)) {
        // return done(null, false);
        return done(null, false, req.flash('signinMessage', 'Incorrect Password'));
    }
    console.log(user);
    return done(null, user);
}));