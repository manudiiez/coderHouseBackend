
import ContenedorMongodb from '../../containers/ContenedorMongodb.js'
import Cart from '../../models/Cart.js'
import Product from '../../models/Product.js'
import OrdersRepository from '../../repositories/orders.repository.js'

export default class OrdersMongoDAO extends ContenedorMongodb {
    constructor(model) {
        super(model)
    }

    getByUser = async (id) => {
        try {
            const result = await this.model.find({ 'user_id': id })
            return result
        } catch (error) {
            throw new Error(error)
        }
    }

    newOrder = async (req) => {
        try {
            const cart = await Cart.findById(req.session.user.idCart)
            if (cart.prods.length === 0) {
                throw new Error('El carrito no tiene productos')
            } else {

                const list = await Promise.all(cart.prods.map(product => {
                    return this.createData(product)
                }))
                const newOrder = {
                    idCliente: req.session.user._id,
                    prods: list,
                    fecha: new Date(),
                    total: await this.getTotalPrice(list)
                }
                const order = new this.model(newOrder)
                const order2 = await order.save()
                const ordersRepoInstance = new OrdersRepository(req.session.user, list, await this.getTotalPrice(list))
                await ordersRepoInstance.sendEmail()
                await Cart.findByIdAndUpdate(req.session.user.idCart,
                    {
                        $set: {
                            'prods': []
                        }
                    },
                    { new: true }
                )
                return order2
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    createData = async (product) => {
        const producto = await Product.findById(product.idProduct)
        const newProduct = {
            producto: {
                name: producto.name,
                description: producto.description,
                price: producto.price,
            },
            cantidad: product.cant,
            subtotal: product.cant * producto.price
        }
        return newProduct
    }

    getTotalPrice = async (list) => {
        let total = 0
        list.map(item => {
            total = total + item.subtotal
        })
        return total
    }

} 