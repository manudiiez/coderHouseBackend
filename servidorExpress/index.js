const { conectar } = require('./servidor.js')

const main = async () => {
    try {
        const app = await conectar(8080)
        console.log(`Conectado al puerto ${app.address().port}`)
    } catch (error) {
        console.log(error)
    }
}

main()