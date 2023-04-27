import { Router } from "express"
import { isAdmin, isAuthenticated } from "../utils/authenticated.js"
import ControladorOrdenes from "../controllers/orders.controller.js"
import { ContendorOrdersDAO } from "../persistence/daos/factory.js"


const routerOrders = new Router()

const controllerOrders = new ControladorOrdenes(ContendorOrdersDAO)

routerOrders.get('/', isAdmin, controllerOrders.getAll)
routerOrders.post('/', isAuthenticated, controllerOrders.newOrder)

export default routerOrders
