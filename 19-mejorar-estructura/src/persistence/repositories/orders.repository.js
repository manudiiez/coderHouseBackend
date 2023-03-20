import { enviadorDeGmails, enviadorDeMails } from '../../utils/enviadorDeMails.js'

const email_admin = 'manudiiez123@gmail.com'

export default class OrdersRepository {
    constructor(user, carrito) {
        this.user = user
        this.carrito = carrito
    }

    async sendEmail() {

        let html = `<h1>Detalles del pedido</h1> <br/>`
        this.carrito.cart.map(product => {
            html += `<h2>ID del producto: ${product.product_id} | Cantidad: ${product.cantidad}</h2> <br/>`
        })

        await enviadorDeGmails.enviar(email_admin, `Ecommerce CoderHouse, nuevo pedido de (${this.user.email}, ${this.user.name})`, html)
        await enviadorDeGmails.enviar(this.user.email, `Ecommerce CoderHouse nuevo pedido registrado`, '<h1>Su pedido fue registrado con exito y se encuentra en proceso</h1>')

    }

}