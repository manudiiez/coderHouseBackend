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



export default routerRandom 