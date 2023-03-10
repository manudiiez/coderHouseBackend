import passport from 'passport';
import { Strategy as LocalStrategy } from "passport-local";
import { enviadorDeMails } from '../messages/enviadorDeMails.js';

import User from '../models/User.js'
const email_admin = 'manudiiez123@gmail.com'

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
        newUser.role = req.body.role || "client";
        newUser.password = newUser.encryptPassword(password);
        // console.log(newUser)
        const info = await enviadorDeMails.enviar(email_admin, 'Ecommerce CoderHouse nuevo registro', `<h1 style="color: blue;">Felicidades un nuevo usuario se a unido a nuestra comunidad</h1> <br/> <h3>Email: ${newUser.email}</h3> <br/> <h3>Name: ${newUser.name}</h3> <br/> <h3>Last name: ${newUser.lastname}</h3> <br/> <h3>Role: ${newUser.role}</h3> `)
        console.log(info);
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
