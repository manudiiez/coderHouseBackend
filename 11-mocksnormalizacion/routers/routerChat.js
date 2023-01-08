import { Router } from "express"
import { ContenedorFirebase } from "../../10-mongoose/containers/ContenedorFirebase.js"
import ContenedorMysql from "../containers/ContenedorMysql.js"
import ControladorChat from "../controllers/controllerChat.js"
import { clienteSql } from "../utils/client.js"


const routerChat = new Router()

// const contenedor = new ContenedorMysql(clienteSql, 'chat')
const contenedor = new ContenedorFirebase('chat')
const controller = new ControladorChat(contenedor)

routerChat.get('/', controller.getAll)
routerChat.post('/', controller.save)

export default routerChat 