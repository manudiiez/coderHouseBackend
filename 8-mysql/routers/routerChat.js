import { Router } from "express"
import ContenedorMysql from "../controllers/ContenedorMysql.js"
import { clienteSql } from "../client.js"
import ControladorChat from "../controllers/controllerChat.js"


const routerChat = new Router()

const contenedor = new ContenedorMysql(clienteSql, 'chat')
const controller = new ControladorChat(contenedor)

routerChat.get('/', controller.getAll)
routerChat.post('/', controller.save)

export default routerChat