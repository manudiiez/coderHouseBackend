const router = require('./routers/router.js')

const { engine } = require('express-handlebars')
const express = require('express')


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.use('/', router)



const server = app.listen(8080, () => {
    console.log(`Aplicaion en el puerto: ${server.address().port}`)
})
