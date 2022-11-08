

class Contenedor {

    // METODOS
    constructor(){
        this.contenedor = []
    }
    
    save(item) {
        this.contenedor.push(item)
    }
    getById(id) {
        const filtered = this.contenedor.filter((item) => item.id === id);
        return filtered
    }
    getAll() {
        return this.contenedor
    }
    deleteById(id) {
        this.contenedor = this.contenedor.filter((item) => item.id !== id);
    }
    deleteAll() {
        this.contenedor = []
    }
}

const productos = new Contenedor()

const producto1 = {
    id: 1,
    title: 'Campera',
    price: 120,
    thumbnail: 'url..as'
}
const producto2 = {
    id: 2,
    title: 'Remera',
    price: 90,
    thumbnail: 'url..as'
}
const producto3 = {
    id: 3,
    title: 'Buzo',
    price: 110,
    thumbnail: 'url..as'
}

productos.save(producto1)
productos.save(producto2)
productos.save(producto3)
console.log(productos.getAll())
console.log(productos.getById(1))
productos.deleteById(1)
console.log(productos.getAll())
productos.deleteAll()
console.log(productos.getAll())