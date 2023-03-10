import express from 'express'
import { router } from './routers/router.js'

const app = express()

app.use('/api', router)

app.listen(8080), () => { console.log('conectado!') }