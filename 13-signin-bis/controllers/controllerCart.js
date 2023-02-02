
class ControladorCart {

    constructor(contenedor, contenedorProductos) {
        this.contenedor = contenedor
        this.contenedorProductos = contenedorProductos
    }

    getAll = async (req, res) => {
        try {
            res.status(200).json({ data: await this.contenedor.getAll() })
        } catch (error) {
            res.status(404).json({ error: `${error}` })
        } 
    }

    create = async(req, res) => {
        try {
            const newCart = {
                products: []
            }
            const cart = await this.contenedor.save(newCart)
            console.log(cart);
            res.status(201).json({ id: cart.id })
        } catch (error) {
            res.status(404).json({ error: `${error}` })
        }
    }

    save = async(req, res) => {
        try {
            const id_cart = req.params.id_cart
            const id = req.body.id
            const newCart = await this.contenedor.getById(id_cart)
            newCart.products.push(id)
            this.contenedor.updateById(id_cart, newCart)
            res.status(201).json({ data: newCart })
        } catch (error) {
            res.status(404).json({ error: `${error}` })
        }
    }
    
    deleteAllProducts = async(req, res) => {
        try {
            const id_cart = req.params.id_cart
            const newCart = await this.contenedor.getById(id_cart)
            newCart.products = []
            const result = await this.contenedor.updateById(id_cart, newCart)
            res.status(201).json({ data: result })
        } catch (error) {
            res.status(404).json({ error: `${error}` })
        }
    }

    deleteOneProduct = async(req, res) => {
        try {
            const id_cart = req.params.id_cart
            const id_prod = req.params.id_prod
            const newCart = await this.contenedor.getById(id_cart)
            const index = newCart.products.findIndex((item) => item.id === id_prod);
            newCart.products.splice(index, 1);
            this.contenedor.updateById(id_cart, newCart)
            res.status(201).json({ data: newCart })
        } catch (error) {
            res.status(404).json({ error: `${error}` })
        }
    }

    getAllProducts = async(req, res) => {
        try {
            const id_cart = req.params.id_cart
            const cart = await this.contenedor.getById(id_cart)
            console.log(cart);
            const list = await Promise.all(cart.products.map(product => {
                return this.contenedorProductos.getById(product)
            }))
            res.status(201).json({ products: list })
        } catch (error) {
            res.status(404).json({ error: `${error}` })
        }
    }

}




export default ControladorCart
