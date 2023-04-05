import { logger } from "../utils/loggers.js"
import { enviadorDeGmails } from "../utils/enviadorDeMails.js"
import User from '../persistence/models/User.js'
import OrdersRepository from '../persistence/repositories/orders.repository.js'


class ControladorOrdenes {

    constructor(contenedor, carrito) {
        this.contenedor = contenedor
        this.carrito = carrito
    }


    getAll = async (req, res) => {
        try {
            res.status(200).json({ data: await this.contenedor.getAll() })
        } catch (error) {
            logger.error(req, error)
            res.status(404).json({ error: `${error}` })
        } 
    }

    save = async (req, res) => {
        try {
            const carrito = await this.carrito.getById(req.user._id)
            const newOrder = {
                user_id: req.user._id,
                date: new Date(),
                order: carrito.cart
            }
            const ordersRepoInstance = new OrdersRepository(req.user, carrito)
            await ordersRepoInstance.sendEmail()
            await User.findOneAndUpdate(
                { '_id': req.user._id },
                {
                    $set: {
                        'cart': []
                    }
                },
                { new: true }
            )
            res.status(200).json({ data: await this.contenedor.save(newOrder) })

        } catch (error) {
            logger.error(req, error)
            res.status(404).json({ error: `${error}` })
        }
    }

    getByUser = async (req, res) => {
        const USER_ID = req.params.USER_ID
        try {
            const result = await this.contenedor.getByUser(USER_ID)
            res.status(200).json(result)
        } catch (error) {
            logger.error(req, error)
            res.status(404).json({ error: `${error}` })
        }
    }

    delete = async (req, res) => {
        const ORDER_ID = req.params.ORDER_ID
        await this.contenedor.deleteById(ORDER_ID)
        try {
            res.status(200).json({msg: "Pedido eliminado"})
            
        } catch (error) {
            logger.error(req, error)
            res.status(404).json({ error: `${error}` })
        }

    }



}




export default ControladorOrdenes
