const fs = require('fs')
const { randomUUID } = require('crypto')


class ContenedorArchivo {

    constructor(ruta) {
        this.ruta = ruta;
        this.elementos = []
    }

    async save(elemento) {
        this.elementos.push(elemento)
        await fs.promises.writeFile(this.ruta, JSON.stringify(this.elementos))
    }
    async getAll() {
        this.elementos = JSON.parse(await fs.promises.readFile(this.ruta, 'utf-8'))
        return this.elementos
    }

    async getById(id) {
        this.elementos = await this.getAll();
        const item = this.elementos.filter(e => e.id === id)
        return item.length === 0 ? null : item
    }
    async deleteById(id) {
        this.elementos = await this.getAll();
        this.elementos = this.elementos.filter(e => e.id !== id)
        await fs.promises.writeFile(this.ruta, JSON.stringify(this.elementos))
    }
    async deleteAll() {
        await fs.promises.writeFile(this.ruta, JSON.stringify([]))
    }

}
const rutaArchivo = './productos.txt'
const contenedor = new ContenedorArchivo(rutaArchivo)

const test = async () => {
    try {
        await contenedor.save({
            title: 'Escuadra',
            price: 123.45,
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
            id: 1
        })
        await contenedor.save({
            title: 'Calculadora',
            price: 234.56,
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
            id: 2
        })
        await contenedor.save({
            title: 'Globo Terráqueo',
            price: 345.67,
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
            id: 3
        })
        await contenedor.save({
            title: 'Escuadra2',
            price: 130.45,
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
            id: randomUUID()
        },)
        await contenedor.save({
            title: 'Escuadra',
            price: 130.45,
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
            id: randomUUID()
        },)
    
        // console.log(await contenedor.getAll())
        console.log(await contenedor.getById(1))
        // await contenedor.deleteById(3)
        // console.log(await contenedor.getAll())
        // await contenedor.deleteAll()
        // console.log(await contenedor.getAll())
        
    } catch (error) {
        console.log(error)
    }
}

test()
