// BASIC
import express from 'express'
import session from 'express-session'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

// IMPORTS
import { randomUUID } from 'crypto'
import { SESSION_SECRET } from './config.js'

const soloUsuariosLogueados = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.sendStatus(401)
    }
    next()

    // si no esta autenticado
    // res.sendStatus(401)
}


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((uid, done) => {
    const user = Object.values(users).find(u => u.id === uid)
    done(null, user)
});

app.use(passport.session())

const users = {}

// Passport nos ofrece un controlador en donde sucede el registro y para eso creamos una estrategia 
passport.use('local-login', new LocalStrategy(
    {},
    (username, password, done) => {
        // el done es la respuestas del passport, es como un send o un json. el primer parametro indicamos si tien error y en el segundo lo quew queremos enviar
        const user = users[username]
        if (user?.password !== password) {
            console.log('no logueado');
            return done(null, false)
        }
        console.log('logueado');
        done(null, user)
    }
))
 
app.post('/register', (req, res, next) => {
    const user = req.body
    // user.id = randomUUID()
    user.id = randomUUID()
    users[user.username] = user
    res.status(201).json(user)
})

app.get('/users/:username', (req, res, next) => {
    res.json(users[req.params.username])
})

/* -------------------------- ESTO ES CON PASSPORT -------------------------- */

// app.post('/sessions', passport.authenticate('local-login', {
//     failureMessage: 'error de autenticacion',
//     successMessage: 'autenticacion exitosa'
// }))
app.post('/sessions',
    passport.authenticate('local-login',
        {
            // en caso de error, no redirige, sino que propaga el error a express!!
            failureMessage: 'logueo fallido'
        }),
    // en caso de éxito, el siguiente controlador maneja la rta al cliente!!
    (req, res) => {
        res.status(201).json({ user: req.user, sessionStart: Date.now() })
    }
)

/* -------------------------- ESTO ES SIN PASSSPORT ------------------------- */
// app.post('/sessions', (req, res, next) => {
//     const { username, password } = req.body
//     const user = users[username]
//     if (password !== user?.password) {
//         res.sendStatus(401)
//     }
//     req.session.user = user
//     res.status(201).json({ user, sessionStart: Date.now() })
// })

app.get('/sessions', soloUsuariosLogueados, (req, res, next) => {
    res.json(req.user)
})


const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`escuchando en puerto ${server.address().port}`)
})