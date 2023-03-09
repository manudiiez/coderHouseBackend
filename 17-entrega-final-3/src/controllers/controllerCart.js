import { randomUUID } from 'crypto'
import { logger } from '../loggers/loggers.js'

class ControladorCart {

    constructor(contenedor, contenedorProductos) {
        this.contenedor = contenedor
        this.contenedorProductos = contenedorProductos
    }

    create = async (req, res) => {
        try {
            res.status(201).json({ data: await this.contenedor.save(req.body) })
        } catch (error) {
            logger.error(req, error)
            res.status(404).json({ error: `${error}` })
        }
    }

    save = async (req, res) => {
        logger.info(req)
        const CART_ID = req.params.CART_ID
        const PRODUCT_ID = req.body.productId
        try {
            res.status(201).json({ data: await this.contenedor.model.findByIdAndUpdate(CART_ID, {
                $push: { products: PRODUCT_ID }
            }) })
        } catch (error) {
            logger.error(req, error)
            res.status(404).json({ error: `${error}` })
        }
    }


    deleteAllProducts = async (req, res) => {
        try {
            const CART_ID = req.params.CART_ID
            const cart = await this.contenedor.getById(CART_ID)
            cart.productos = []
            res.status(201).json({ data: await this.contenedor.updateById(cart) })
        } catch (error) {
            res.status(404).json({ error: `${error}` })
        }
    }

    deleteOneProduct = async (req, res) => {
        try {
            const id_cart = req.params.id_cart
            const id_prod = req.params.id_prod
            const cart = await this.contenedor.getById(id_cart)
            cart.productos = cart.productos.filter(e => e.id !== id_prod)
            res.status(201).json({ data: await this.contenedor.updateById(cart) })
        } catch (error) {
            res.status(404).json({ error: `${error}` })
        }
    }

    getAllProducts = async (req, res) => {
        try {
            const id_cart = req.params.id_cart
            const cart = await this.contenedor.getById(id_cart)
            res.status(201).json({ products: cart.productos })
        } catch (error) {
            res.status(404).json({ error: `${error}` })
        }
    }

}




export default ControladorCart
