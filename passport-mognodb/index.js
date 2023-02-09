import express from "express";
import session from 'express-session'
import mongoose from "mongoose";
import passport from "passport";
import routerAuth from "./routers/router.js";

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const MONGO_URI = 'mongodb://localhost:27017/passport-login'

import './passport/local-auth.js'

/* ---------------------------- MONGO CONNECTION ---------------------------- */
const connect = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to mongoDB')
    } catch (error) {
        throw error;
    }
}

// Si esta desconectada devuelve
mongoose.connection.on('disconnected', () => {
    console.log('mongoDB disconnected!!')
})
// Si esta conectada devuelve
mongoose.connection.on('connected', () => {
    console.log('mongoDB connected!!')
})


app.use('/api/auth', routerAuth)


const server = app.listen(process.env.PORT || 8080, () => {
    connect()
    console.log(`Aplicaion en el puerto: ${server.address().port}`)
}) 