import { Router } from "express"
import ContenedorMysql from "../containers/ContenedorMysql.js"
import ControladorChat from "../controllers/controllerChat.js"
import { clienteSql } from "../config/clientMysql.js"
import ContenedorMongodb from "../containers/ContenedorMongodb.js"
import ControladorProductos from "../controllers/controllerProductos.js"
import { ContenedorFirebase } from "../containers/ContenedorFirebase.js"
import Chat from "../models/Chat.js"


const routerChat = new Router()
/* ---------------------------------- MYSQL --------------------------------- */
// const contenedor = new ContenedorMysql(clienteSql, 'chat')

/* -------------------------------- FIREBASE -------------------------------- */
// const contenedor = new ContenedorFirebase('chat')


/* --------------------------------- MONGODB -------------------------------- */
const contenedor = new ContenedorMongodb(Chat)


const controller = new ControladorProductos(contenedor)

routerChat.get('/', controller.getAll)
routerChat.post('/', controller.save)

export default routerChat