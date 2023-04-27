
import ContenedorMongodb from '../../containers/ContenedorMongodb.js'
import Cart from '../../models/Cart.js'
import Product from '../../models/Product.js'

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
            const cart = await Cart.findById(req.user.idCart)
            // const list = await Promise.all(cart.prods.map(product => {
            //     return Product.findById(product.idProduct)
            // }))
            const list = await Promise.all(cart.prods.map(product => {
                return this.createData(product)
            }))
            const newOrder = {
                idCliente: req.user._id,
                prods: list,
                fecha: new Date(),
                total: await this.getTotalPrice(list)
            }
            console.log(newOrder);
            const order = new this.model(newOrder)
            const order2 = await order.save()
            await Cart.findByIdAndUpdate(req.user.idCart,
                {
                    $set: {
                        'prods': []
                    }
                }, 
                { new: true }
            )
            return order2
        } catch (error) {
            throw new Error(error)
        }
    }

    createData = async(product) => {
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

    getTotalPrice = async(list) => {
        let total = 0
        list.map(item => {
            total = total + item.subtotal
        })
        return total
    }

} 