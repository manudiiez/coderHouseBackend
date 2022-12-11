import {randomUUID} from 'crypto'


class ControladorCart {

    constructor(contenedor, contenedorProductos) {
        this.contenedor = contenedor
        this.contenedorProductos = contenedorProductos
    }

    create = async(req, res) => {
        try {
            const id = randomUUID();
            const newCart = {
                productos: [],
                id: id
            }
            const cart = await this.contenedor.save(newCart)
            res.status(201).json({ id: cart.id })
        } catch (error) {
            res.status(404).json({ error: `${error}` })
        }
    }

    save = async(req, res) => {
        try {
            const id_cart = req.params.id_cart
            const id = req.body.id
            const cart = await this.contenedor.getById(id_cart)
            const newProduct = await this.contenedorProductos.getById(id)
            cart.productos.push(newProduct)
            res.status(201).json({ data: await this.contenedor.updateById(cart) })
        } catch (error) {
            res.status(404).json({ error: `${error}` })
        }
    }
    
    deleteAllProducts = async(req, res) => {
        try {
            const id_cart = req.params.id_cart
            const cart = await this.contenedor.getById(id_cart)
            cart.productos = []
            res.status(301).json({ data: await this.contenedor.updateById(cart) })
        } catch (error) {
            res.status(404).json({ error: `${error}` })
        }
    }

    deleteOneProduct = async(req, res) => {
        try {
            const id_cart = req.params.id_cart
            const id_prod = req.params.id_prod
            const cart = await this.contenedor.getById(id_cart)
            const index = cart.productos.findIndex(item => item.id === id_prod)
            cart.productos.splice(index, 1);
            res.status(301).json({ data: await this.contenedor.updateById(cart) })
        } catch (error) {
            res.status(404).json({ error: `${error}` })
        }
    }

    getAllProducts = async(req, res) => {
        try {
            const id_cart = req.params.id_cart
            const cart = await this.contenedor.getById(id_cart)
            res.status(200).json({ products: cart.productos })
        } catch (error) {
            res.status(404).json({ error: `${error}` })
        }
    }

}




export default ControladorCart
