import { enviadorDeGmails, enviadorDeMails } from '../../utils/enviadorDeMails.js'

const email_admin = 'manudiiez123@gmail.com'

export default class OrdersRepository {
    constructor(user, cart, total) {
        this.user = user
        this.cart = cart
        this.total = total
    }

    async sendEmail() {

        let html = `<h1>Detalles del pedido</h1> <br/>`
        this.cart.map(product => {
            html += `<h4>Producto: ${product.producto.name} | Cantidad: ${product.cantidad} | Subtotal: ${product.subtotal}</h4> <br/> <hr/>`
        })
        html += `<h3>Total del pedido: $${this.total}</h3> <br/>`

        await enviadorDeGmails.enviar(email_admin, `Ecommerce CoderHouse, nuevo pedido de (${this.user.email}, ${this.user.name})`, html)
        await enviadorDeGmails.enviar(this.user.email, `Ecommerce CoderHouse nuevo pedido registrado`, '<h1>Su pedido fue registrado con exito y se encuentra en proceso</h1>')

    }

}