import { Router } from "express"
import { fork } from 'child_process'


const routerRandom = new Router()


routerRandom.get('/', (req, res) => {
    let { cant } = req.query
    const childProcess = fork('./src/utils/randomNumbers.js')

    cant ? childProcess.send({ order: 'start', cant }) : childProcess.send({ order: 'start', cant: 100000000 });
    childProcess.on('message', message => res.json({ message }))
    // res.status(200).json({ data: 'god' })
})

routerRandom.get('/bloqueante', (req, res) => {
    const resultado = calculoLento()
    res.json({ resultado })
})

function calculoLento() {
    let sum = 0
    for (let i = 0; i < 5e9; i++) {
        sum += i
    }
    return sum
}

export default routerRandom  