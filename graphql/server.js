import express from 'express'
import { graphQLRouter } from './graphqldemo.js'
import { restRouter } from './router.js'
import { personasService } from './personaService.js'

export const app = express()
app.use(express.json())

app.use('/api', restRouter)
app.use('/graphql', graphQLRouter)

app.get('/persona/:id', (req, res, next) => {
    res.json(personasService.getById('1'))
})

app.listen(8080, () => { console.log('escuchando!') })

