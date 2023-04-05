/* --------------------------------- ORDERS --------------------------------- */
import OrdersFileDAO from './file/orders.dao.js'
import OrdersMongoDAO from './mongo/orders.dao.js'
/* ---------------------------------- CARTS --------------------------------- */
import UsersFileDAO from './file/users.dao.js'
import UsersMongoDAO from './mongo/users.dao.js'

/* --------------------------------- MODELS --------------------------------- */
import Orders from "../models/Orders.js"
import User from '../models/User.js'
import Product from '../models/Product.js'


import * as dotenv from 'dotenv'
import ContenedorArchivo from '../containers/ContenedorArchivo.js'
import ContenedorMongodb from '../containers/ContenedorMongodb.js'
dotenv.config()

let ContendorOrdersDAO, ContendorUsuariosDAO, ContendorProductosDAO

class factorySwitcher {
    static instance

    constructor(dao) {
        switch (dao) {
            case 'file':
                ContendorOrdersDAO = new OrdersFileDAO('./src/fileDB/orders.json')
                // ContendorUsuariosDAO = new UsersMongoDAO(User)
                ContendorUsuariosDAO = new UsersFileDAO('./src/fileDB/users.json')
                ContendorProductosDAO = new ContenedorArchivo('./src/fileDB/products.json')
                break;
                
                default:
                ContendorUsuariosDAO = new UsersMongoDAO(User)
                ContendorOrdersDAO = new OrdersMongoDAO(Orders)
                ContendorProductosDAO = new ContenedorMongodb(Product)

                break;
        }
    }

    getInstance() {
        if (!this.instance) {
            this.instance = new factorySwitcher()
        }
        return this.instance
    }
}

export const setDAO = new factorySwitcher(process.env.DAO === 'file' ? 'file' : '')

export { ContendorOrdersDAO, ContendorUsuariosDAO, ContendorProductosDAO }