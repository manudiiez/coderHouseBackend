// Esto es lo que hace express session por mi
import express from 'express'
import cookieParser from 'cookie-parser'
import {randomUUID} from 'crypto'

const app = express()

const PALABRA_SECRETA = 'palabra'

app.use(cookieParser(PALABRA_SECRETA))

// Esto
const usuarios = {}
const fichero = {}

app.post('/registro', (req, res) => {
    const {dni} = req.body
    const idUsuario = randomUUID()
    usuarios[dni] = idUsuario
    fichero[idUsuario] = []
    res.cookie('nroSocio', idUsuario, { signed: true, maxAge: 1000 * 60 * 60 * 24 * 7  })
    res.sendStatus(201)
})

app.post('/login', (req,res) => {
    const {dni} = req.body
    res.cookie('nroSocio', usuarios[dni], { signed: true, maxAge: 1000 * 60 * 60 * 24 * 7  })
    res.sendStatus(201)
})

// Esto
function buscarFichero(req, res, next){
    const idUsuario  = req.signedCookies?.nroSocio
    if(!idUsuario){
        return res.sendStatus(401)
    }
    req.ficha = fichero[idUsuario]
    next()
}

app.post('/prestamos', buscarFichero, (req,res) => {
     const {idLibro} = req.body
    req.ficha.push(idLibro)
    res.sendStatus(201)
})

const PORT = 8080
app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${PORT}`)
})
