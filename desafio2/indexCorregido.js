const fs = require('fs')
const { randomUUID } = require('crypto')


class ContenedorArchivo {

    constructor(ruta) {
        this.ruta = ruta;
        this.elementos = []
    }


    async getAll() {
        try {
            this.elementos = JSON.parse(await fs.promises.readFile(this.ruta, 'utf-8'))
            console.log(this.elementos)
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

}
const rutaArchivo = './productos.txt'
const contenedor = new ContenedorArchivo(rutaArchivo)

const test = async () => {
    await contenedor.save({
        title: 'Escuadra',
        price: 123.45,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
        id: null
    })
    await contenedor.save({
        title: 'Calculadora',
        price: 234.56,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
        id: null
    })
    await contenedor.save({
        title: 'Globo Terráqueo',
        price: 345.67,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
        id: null
    })
    await contenedor.save({
        title: 'Tijera',
        price: 130.45,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
        id: null
    },)
    await contenedor.save({
        title: 'Regla',
        price: 130.45,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
        id: null
    },)

    // console.log(await contenedor.getAll())
    // console.log(await contenedor.getById(1))
    // await contenedor.deleteById(3)
    // console.log(await contenedor.getAll())
    // // await contenedor.deleteAll()
    // console.log(await contenedor.getAll())
        
}

test()
