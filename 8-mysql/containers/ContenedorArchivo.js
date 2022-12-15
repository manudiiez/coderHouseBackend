// const fs = require('fs')
import fs from 'fs'

class ContenedorArchivo {

    constructor(ruta) {
        this.ruta = ruta;
        this.productos = []
    }


    async getAll() {
        try {
            this.productos = JSON.parse(await fs.promises.readFile(this.ruta, 'utf-8'))
            return this.productos
        } catch (error) {
            throw new Error(`No se encontro la ruta ${this.ruta}`)
        }
    }
    async save(producto) {
        try {
            this.productos = await this.getAll();
            this.productos.push(producto)
            await fs.promises.writeFile(this.ruta, JSON.stringify(this.productos, null, 2))
            return producto
        } catch (error) {
            throw new Error(`Error al leer el archivo con ruta ${this.ruta}`)
        }
    }

    async getById(id) {
        try {
            this.productos = await this.getAll();
            const productoIndex = this.productos.findIndex(item => item.id === id)
            if (productoIndex === -1) {
                throw new Error(`No se encontro ningun producto con el id: ${id}`)
            }
            return this.productos[productoIndex]
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateById(objeto) {
        try {
            this.productos = await this.getAll();
            const productoIndex = this.productos.findIndex(item => item.id === objeto.id)
            if (productoIndex === -1) {
                throw new Error(`No se encontro ningun producto con el id: ${id}`)
            }
            this.productos[productoIndex] = objeto;
            await fs.promises.writeFile(this.ruta, JSON.stringify(this.productos, null, 2))
            return objeto
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteById(id) {
        try {
            this.productos = await this.getAll();
            this.productos = this.productos.filter(e => e.id !== id)
            await fs.promises.writeFile(this.ruta, JSON.stringify(this.productos, null, 2))
            return `Producto ${id} eliminado`
        } catch (error) {
            throw new Error(`Error al leer el archivo con ruta ${this.ruta}`)
        }
    }
}

export default ContenedorArchivo
