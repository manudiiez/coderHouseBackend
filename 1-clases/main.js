
let Productos = []


class Contenedor {

    constructor(contenedor){
        this.contenedor = []
        this.productos = []
    }
    
    
    // METODOS
    
    save(id, title, price, thumbnail) {
        const newObject = {
            id: id,
            title :title,
            price: price,
            thumbnail: thumbnail
        }
        this.productos.push(newObject)
    }
    getById(id) {
        const filtered = this.productos.filter((item) => item.id === id);
        return filtered
    }
    getAll() {
        return this.productos
    }
    deleteById(id) {
        const filtered = this.productos.filter((item) => item.id !== id);
        return filtered
    }
    deleteAll() {
        this.productos = []
        return this.productos
    }
}



let contenedor = new Contenedor('tienda');
contenedor.save(1, 'buzo', 110, 'url')
contenedor.save(2, 'campera', 120, 'url')
contenedor.save(3, 'remera', 100, 'url')
contenedor.save(4, 'remera 2', 105, 'url')

console.log(contenedor.getAll())
console.log(contenedor.getById(2))
console.log(contenedor.deleteById(3))
console.log(contenedor.deleteAll())