const express = require('express')
const fs = require('fs')


const app = express()
const rutaArchivo = './productos.txt'


class ContenedorArchivo {

    constructor(ruta) {
        this.ruta = ruta;
        this.elementos = []
    }


    async getAll() {
        try {
            this.elementos = JSON.parse(await fs.promises.readFile(this.ruta, 'utf-8'))
            return this.elementos
        } catch (error) {
            throw new Error(`Error al leer el archivo con ruta ${this.ruta}`)
        }
    }
    async save(elemento) {
        try {
            this.elementos = await this.getAll();
            let item = elemento
            item.id = this.elementos[this.elementos.length - 1].id + 1
            this.elementos.push(item)
            await fs.promises.writeFile(this.ruta, JSON.stringify(this.elementos, null, 2))
        } catch (error) {
            throw new Error(`Error al leer el archivo con ruta ${this.ruta}`)
        }
    }

    async getById(id) {
        try {
            this.elementos = await this.getAll();
            const item = this.elementos.filter(e => e.id === id)
            return item.length === 0 ? null : item
        } catch (error) {
            throw new Error(`Error al leer el archivo con ruta ${this.ruta}`)
        }
    }
    async deleteById(id) { 
    try {
            this.elementos = await this.getAll();
            this.elementos = this.elementos.filter(e => e.id !== id)
            await fs.promises.writeFile(this.ruta, JSON.stringify(this.elementos, null, 2))
    } catch (error) {
        throw new Error(`Error al leer el archivo con ruta ${this.ruta}`)
    }
    }
    async deleteAll() {
        try {
            this.elementos = []
            await fs.promises.writeFile(this.ruta, JSON.stringify(this.elementos))
        } catch (error) {
            throw new Error(`Error al leer el archivo con ruta ${this.ruta}`)
        }
    }

    async getRandom() {
        try {
            this.elementos = await this.getAll();
            const rand = Math.floor(Math.random()*this.elementos.length);
            return this.elementos[rand]
        } catch (error) {
            throw new Error(`Error al leer el archivo con ruta ${this.ruta}`)
        }
    }



}

const contenedor = new ContenedorArchivo(rutaArchivo)

app.get('/productos', async(req, res) => {
    res.send(await contenedor.getAll())
})
app.get('/productoRandom', async(req, res) => {
    res.send(await contenedor.getRandom())
})

function conectar(puerto = 0) {
    return new Promise((resolve, reject) => {
        const servidorConectador = app.listen(puerto, () => {
            resolve(servidorConectador)
        })
        servidorConectador.on("error", error => reject(error))
    })
}

module.exports = { conectar }
