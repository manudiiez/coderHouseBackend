import fs from 'fs'

class ContenedorArchivo {
    constructor(path) {
        this.path = path;
    }

    async getAll() {
        try {
            return JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        } catch (error) {
            throw new Error(`${error}`)
        }
    }

    async save(producto) {
        try {
            const productos = await this.getAll();
            const _id = await this.#getId()
            const newProduct = {_id, ...producto}
            productos.push(newProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2))
            return newProduct
        } catch (error) {
            throw new Error(`Error al leer el archivo con ruta ${this.path}`)
        }
    }

    async getById(id) {
        try {
            const productos = await this.getAll();
            const producto = productos.find(item => item._id === parseInt(id))
            return producto
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateById(id, objeto) {
        try {
            const productos = await this.getAll();
            const productoIndex = productos.findIndex(item => item._id === parseInt(id))
            if (productoIndex === -1) {
                throw new Error(`No se encontro ningun item con el id: ${id}`)
            }
            const newObject = productos[productoIndex]
            newObject.name = objeto.name || newObject.name
            newObject.price = objeto.price || newObject.price
            newObject.description = objeto.description || newObject.description
            newObject.image = objeto.image || newObject.image
            productos[productoIndex] = newObject;
            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2))
            return newObject
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteById(id) {
        console.log(id);
        try {
            let productos = await this.getAll();
            console.log(productos);
            productos = productos.filter(e => e._id !== parseInt(id))
            console.log(productos);
            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2))
            return `Item ${id} eliminado`
        } catch (error) {
            throw new Error(`Error al leer el archivo con ruta ${this.path}`)
        }
    }

    #getId = async () => {
        try {
            let id
            const users = await this.getAll()
            if (users.length === 0) {
                id = 1
            } else {
                id = users[users.length - 1]._id + 1
            }

            return id
        } catch (error) {
            return { error: 'Ocurrio un error inesperado' }
        }
    }

}

export default ContenedorArchivo
