import express from 'express'
import pino from 'pino'
import * as fs from 'fs';


const app = express()
const logger = pino()
// const logger = pino({
//     transport: {
//         target: 'pino-pretty'
//     },
//     options: {
//         colorize: true
//     }
// })


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.status(404).json({ msg: 'index' })
})
app.get('/info', (req, res) => {
    logger.info('pino info')
    res.status(404).json({ msg: 'info' })
})
app.get('/error', (req, res) => {
    logger.error('pino error')
    res.status(404).json({ msg: 'error' })
})
app.get('/warn', (req, res) => {
    logger.warn('pino warn')
    res.status(404).json({ msg: 'warn' })
})


app.listen(process.env.PORT || 8080, () => {
    console.log(`Aplicaion en el puerto: 8080`)
})