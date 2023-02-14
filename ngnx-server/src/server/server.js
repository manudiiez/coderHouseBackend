
import express, { Router } from 'express'

function calculoLento() {
    let sum = 0
    for (let i = 0; i < 5e9; i++) {
        sum += i
    }
    return sum
}

const router = Router()
router.get('/', (req, res, next) => {
    res.send(`[pid: ${process.pid}] petricion recibida!!`)
})
router.get('/god', (req, res, next) => {
    res.send(`[pid: ${process.pid}] petricion god recibida!!`)
})

router.get('/bloqueante', (req, res) => {
    const resultado = calculoLento()
    res.json({ resultado })
})

export default class Server {
    #app
    #server
    constructor() {
        this.#app = express()
        this.#app.use('/api', router)
    }

    async conectar({ puerto = 0 }) {
        return new Promise((resolve, reject) => {

            this.#server = this.#app.listen(puerto, () => {
                resolve({ puerto })
            })

            this.#server.on('error', error => {
                reject(error)
            })
        })
    }
    async desconectar() {
        return new Promise((resolve, reject) => {
            this.#server.close(error => {
                if (error) {
                    reject(error)
                } else {
                    resolve(true)
                }
            })
        })
    }
}


