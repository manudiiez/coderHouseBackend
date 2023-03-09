import passport from 'passport';
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
    nameField: 'name',
    lastnameField: 'lastname',
    imageField: 'image',
    // Esto permite que recibamos ademas del email y password, que recibamos el request
    // el done nos permite responder al cliente
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ 'email': email })
    if (user) {
        return done(null, false, req.flash('signupMessage', 'Ya existe un usuario con ese email'));
    } else {
        const newUser = new User();
        newUser.email = email;
        newUser.name = req.body.name;
        newUser.lastname = req.body.lastname;
        newUser.image = req.body.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgTgK1EYhwitE3CCCdbK1bNwFIu-vo2B5dnA&usqp=CAU";
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
    console.log(user);
    if (!user) {
        return done(null, false, req.flash('signinMessage', 'No se encontro ningun usuario con ese email'));
    }
    if (!user.comparePassword(password)) {
        return done(null, false, req.flash('signinMessage', 'Contraseña incorrecta'));
    }
    return done(null, user);
}));
