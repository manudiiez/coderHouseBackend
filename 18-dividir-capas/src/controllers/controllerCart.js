import { randomUUID } from 'crypto'
import { logger } from '../utils/loggers.js'
import Product from '../persistence/models/Product.js'

class ControladorCarrito {

    constructor(contenedor, contenedorProductos) {
        this.contenedor = contenedor
        this.contenedorProductos = contenedorProductos
    }

    getAll = async (req, res) => {
        logger.info(req)
        try {
            const user = await this.contenedor.getById(req.user._id)
            const listProducts = await Promise.all(user.cart.map(producto => {
                return Product.findById(producto.product_id)
            }))
            const carrito_list = listProducts.map((producto, index) => {
                const newObject = {
                    _id: producto._id,
                    name: producto.name,
                    price: producto.price,
                    cantidad: user.cart[index].cantidad,
                }
                return newObject
            })
            res.status(200).json(carrito_list)
        } catch (error) {
            logger.error(req, error)
            res.status(404).json({ error: `${error}` })
        }
    }

    getAllView = async (req, res, next) => {
        logger.info(req)
        try {
            const user = await this.contenedor.getById(req.user._id)
            const listProducts = await Promise.all(user.cart.map(producto => {
                return Product.findById(producto.product_id)
            }))
            const carrito_list = listProducts.map((producto, index) => {
                const newObject = {
                    _id: producto._id,
                    name: producto.name,
                    price: producto.price,
                    cantidad: user.cart[index].cantidad,
                }
                return newObject
            })
            req.carrito = carrito_list
            next()
        } catch (error) {
            logger.error(req, error)
            res.status(404).json({ error: `${error}` })
        }
    }

    save = async (req, res) => {
        logger.info(req)
        const PRODUCT_ID = req.body.productId
        try {
            const cart = await this.contenedor.getOne({ '_id': req.user._id, 'cart.product_id': PRODUCT_ID })
            if (cart === null) {
                const newObject = {
                    'product_id': PRODUCT_ID,
                    'cantidad': 1,
                }
                const result = await this.contenedor.addNewProduct(req.user._id, newObject)
                res.status(200).json({ data: result })
            } else {
                const product = cart.cart.find(item => item.product_id === PRODUCT_ID);
                const result = await this.contenedor.addExistingProduct(req.user._id, PRODUCT_ID, product, true)
                res.status(200).json({ data: result })
            }
        } catch (error) {
            logger.error(req, error)
            res.status(404).json({ error: `${error}` })
        }
    }

    deleteById = async (req, res) => {
        logger.info(req)
        const PRODUCT_ID = req.params.PRODUCT_ID
        try {
            const cart = await this.contenedor.getOne({ '_id': req.user._id, 'cart.product_id': PRODUCT_ID })
            if (cart === null) {
                res.status(200).json({ data: 'Ese objeto no esta en su carrito' })
            } else {
                const product = cart.cart.find(item => item.product_id === PRODUCT_ID);
                if (product.cantidad > 1) {
                    const result = await this.contenedor.addExistingProduct(req.user._id, PRODUCT_ID, product, false)
                    res.status(200).json({ data: result })
                } else {
                    const result = await this.contenedor.deleteProduct(req.user._id, PRODUCT_ID)
                    res.status(200).json({ data: result })
                }
            }

        } catch (error) {
            logger.error(req, error)
            res.status(404).json({ error: `${error}` })
        }
    }

    delete = async (req, res, next) => {
        try {
            const result = await this.contenedor.deleteAllProduct(req.user._id)
            res.status(200).json({ data: result })
        } catch (error) {
            logger.error(req, error)
            res.status(404).json({ error: `${error}` })
        }
    }

}




export default ControladorCarrito
