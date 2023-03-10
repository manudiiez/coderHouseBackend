import { randomUUID } from 'crypto'
import { logger } from '../loggers/loggers.js'

class ControladorCarrito {

    constructor(contenedor, contenedorProductos) {
        this.contenedor = contenedor
        this.contenedorProductos = contenedorProductos
    }

    getAll = async (req, res) => {
        logger.info(req)
        console.log(req.user);
        try {
            const user = await this.contenedor.getById(req.user._id)
            res.status(200).json(user.cart)
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
                try {
                    const newObject = {
                        'product_id': PRODUCT_ID,
                        'cantidad': 1,
                    }
                    const cart = await this.contenedor.model.findByIdAndUpdate(req.user._id,
                        { $push: { cart: newObject } },
                        { new: true }
                    )
                    res.status(200).json({ data: cart })
                } catch (error) {
                    logger.error(req, error)
                    res.status(404).json({ error: `${error}` })
                }
            } else {
                const product = cart.cart.find(item => item.product_id === PRODUCT_ID);
                try {
                    const product2 = await this.contenedor.model.findOneAndUpdate(
                        { '_id': req.user._id, 'cart.product_id': PRODUCT_ID },
                        {
                            $set: {
                                'cart.$.cantidad': product.cantidad += 1
                            }
                        },
                        { new: true }
                    )
                    res.status(200).json({ data: product2, msg: 'cantida modificada' })
                } catch (error) {
                    logger.error(req, error)
                    res.status(404).json({ error: `${error}` })
                }
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

                    try {
                        const product2 = await this.contenedor.model.findOneAndUpdate(
                            { '_id': req.user._id, 'cart.product_id': PRODUCT_ID },
                            {
                                $set: {
                                    'cart.$.cantidad': product.cantidad -= 1
                                }
                            },
                            { new: true }

                        )
                        res.status(200).json({ data: product2, msg: 'cantida modificada' })
                    } catch (error) {
                        logger.error(req, error)
                        res.status(404).json({ error: `${error}` })
                    }
                } else {

                    try {
                        const result = await this.contenedor.model.findByIdAndUpdate(req.user._id,
                            {
                                $pull: { 'cart': { 'product_id': PRODUCT_ID } }
                            },
                            { new: true }
                        );
                        res.status(200).json({ data: result })
                    } catch (error) {
                        logger.error(req, error)
                        res.status(404).json({ error: `${error}` })
                    }
                }
            }

        } catch (error) {
            logger.error(req, error)
            res.status(404).json({ error: `${error}` })
        }
    }

    delete = async (req, res, next) => {

        try {
            const cart = await this.contenedor.model.findOneAndUpdate(
                { '_id': req.user._id },
                {
                    $set: {
                        'cart': []
                    }
                },
                { new: true }
            )
            res.status(200).json({ data: cart })
        } catch (error) {
            logger.error(req, error)
            res.status(404).json({ error: `${error}` })
        }
    }

}




export default ControladorCarrito
