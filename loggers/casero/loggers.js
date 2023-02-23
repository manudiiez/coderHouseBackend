import path from 'path'
import * as fs from 'fs';

class Logger {
    static DEBUG = 0
    static INFO = 5
    static ERROR = 8

    constructor({ nivel = 0, soportes = [] }) {
        this.nivel = nivel
        this.soportes = soportes
    }

    static armarMensaje(mensaje) {
        return `[${new Date().toISOString()}] ${mensaje}`
        // return JSON.stringify({ date: new Date().toISOString(), descripcion: mensaje })
    }

    log(nivel, mensaje) {
        if (nivel >= this.nivel) {
            this.registrar(nivel, Logger.armarMensaje(mensaje))
        }
    }

    debug(mensaje) {
        this.log(Logger.DEBUG, mensaje)
    }
    info(mensaje) {
        this.log(Logger.INFO, mensaje)
    }
    error(mensaje) {
        this.log(Logger.ERROR, mensaje)
    }

    registrar(nivel, mensaje) {
        for (const soporte of this.soportes) {
            soporte.registrar(nivel, mensaje)
        }
    }
}

class SoporteTerminal {
    constructor({ nivel }) {
        this.nivel = nivel
    }
    registrar(nivel, mensaje) {
        if (nivel >= this.nivel) {
            console.log(mensaje)
        }
    }
}

class SoporteArchivo {
    constructor({ ruta, nivel }) {
        this.ruta = ruta
        this.nivel = nivel
    }
    registrar(nivel, mensaje) {
        if (nivel >= this.nivel) {
            fs.appendFile(this.ruta, mensaje + '\n', function (err) {
                if (err) throw err;
            })
        }
    }
}


const logger = new Logger({
    soportes: [
        new SoporteTerminal({ nivel: Logger.DEBUG }),
        new SoporteArchivo({ ruta: 'servidor.log', nivel: Logger.ERROR })
    ]
})

class Servidor {
    constructor(tester) {
        logger.debug('construyendo el servidor para el usuario: ' + tester)
        this.tester = tester
        logger.debug('construccion finalizada')
    }

    conectar() {
        logger.debug('conectando el servidor')
        try {
            if (Math.random() > 0.6) {
                logger.info('servidor conectado')
            } else {
                throw new Error('error aleatorio')
            }
        } catch (error) {
            logger.error('error de conexion! ' + error.message)
        }
    }
}


const nombre = 'nombre'
const servidor = new Servidor(nombre)
servidor.conectar()