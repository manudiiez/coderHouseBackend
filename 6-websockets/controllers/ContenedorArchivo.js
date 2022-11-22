const fs = require('fs')


class ContenedorArchivo {

    constructor(ruta) {
        this.ruta = ruta;
        this.lista = []
    }


    async getAll() {
        try {
            this.lista = JSON.parse(await fs.promises.readFile(this.ruta, 'utf-8'))
            return this.lista
        } catch (error) {
            throw new Error(`No se encontro la ruta ${this.ruta}`)
        }
    }
    async save(producto) {
        try {
            this.lista = await this.getAll();
            this.lista.unshift(producto)
            await fs.promises.writeFile(this.ruta, JSON.stringify(this.lista, null, 2))
            return producto
        } catch (error) {
            throw new Error(`Error al leer el archivo con ruta ${this.ruta}`)
        }
    }

    async getById(id) {
        try {
            this.lista = await this.getAll();
            const productoIndex = this.lista.findIndex(item => item.id === id)
            if (productoIndex === -1) {
                throw new Error(`No se encontro ningun producto con el id: ${id}`)
            }
            return this.lista[productoIndex]
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateById(objeto) {
        try {
            this.lista = await this.getAll();
            const productoIndex = this.lista.findIndex(item => item.id === objeto.id)
            if (productoIndex === -1) {
                throw new Error(`No se encontro ningun producto con el id: ${id}`)
            }
            this.lista[productoIndex] = objeto;
            await fs.promises.writeFile(this.ruta, JSON.stringify(this.lista, null, 2))
            return objeto
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteById(id) {
        try {
            this.lista = await this.getAll();
            this.lista = this.lista.filter(e => e.id !== id)
            await fs.promises.writeFile(this.ruta, JSON.stringify(this.lista, null, 2))
            return `Producto ${id} eliminado`
        } catch (error) {
            throw new Error(`Error al leer el archivo con ruta ${this.ruta}`)
        }
    }
}

exports.ContenedorArchivo = ContenedorArchivo;
