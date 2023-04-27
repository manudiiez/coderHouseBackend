import ContenedorArchivo from '../../containers/ContenedorArchivo.js'


export default class OrdersFileDAO extends ContenedorArchivo {
    constructor(path) {
        super(path)
    }

    getByUser = async(id) => {
        try {
            const productos = await this.getAll()
            const producto = productos.find(item => item.user_id === id)
            return producto
        } catch (error) {
            throw new Error(error)
        }
    }
}