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
            res.status(200).json({ data: user.cart })
        } catch (error) {
            logger.error(req, error)
            res.status(404).json({ error: `${error}` })
        }
    }

    // save = async (req, res) => {
    //     logger.info(req)
    //     const PRODUCT_ID = req.body.productId
    //     try {
    //         const product_in_cart = await this.contenedor.model.findOne({_id: req.user._id}, {cart: {$elemMatch: {product_id: PRODUCT_ID}}})

    //         if (product_in_cart.cart.length == 0){
    //             console.log('ese producto no esta');
    //             const newObject = {
    //                 'product_id': PRODUCT_ID,
    //                 'cantidad': 1,
    //             }
    //             const user = await this.contenedor.model.findByIdAndUpdate(req.user._id, {
    //                 $push: { cart: newObject }
    //             })
    //             res.status(200).json({ data: user })
    //         }else{
    //             console.log('ese producto si esta');
    //             console.log(product_in_cart.cart[0])
    //             res.status(200).json({ data: product_in_cart })
    //         }

    //         console.log(product_in_cart);

    //     } catch (error) {
    //         logger.error(req, error)
    //         res.status(404).json({ error: `${error}` })
    //     }
    //     // const newObject = {
    //     //     'product_id': PRODUCT_ID,
    //     //     'cantidad': 1,
    //     // }
    //     // const user = await this.contenedor.model.findByIdAndUpdate(req.user._id, {
    //     //     $push: { cart: newObject }
    //     // })
    //     // try {
    //     //     res.status(200).json({ data: req.user.cart })
    //     // } catch (error) {
    //     //     logger.error(req, error)
    //     //     res.status(404).json({ error: `${error}` })
    //     // } 
    // }
    save = async (req, res) => {
        logger.info(req)
        const PRODUCT_ID = req.body.productId
        try {
            const cart = await this.contenedor.model.findOne({ '_id': req.user._id, 'cart.product_id': PRODUCT_ID })
            if (cart === null) {
                try {
                    const cart = await this.contenedor.model.findByIdAndUpdate(req.user._id, {
                        $push: { cart: newObject }
                    })
                    res.status(200).json({ data: cart })
                } catch (error) {
                    logger.error(req, error)
                    res.status(404).json({ error: `${error}` })
                }
            } else {
                // const product = this.contenedor.model.aggregate([
                //     {
                //         $match: {
                //             "_id": req.user._id
                //         }
                //     },
                //     {
                //         "$addFields": {
                //             "cart": {
                //                 "$filter": {

                //                 }
                //             }
                //         }
                //     }
                // ]);
                // console.log(product);
                try {
                    const product2 = await this.contenedor.model.findOneAndUpdate(
                        { '_id': req.user._id, 'cart.product_id': PRODUCT_ID },
                        {
                            $set: {
                                'cart.$.cantidad': cart.$.cantidad + 2
                            }
                        }
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

}




export default ControladorCarrito
