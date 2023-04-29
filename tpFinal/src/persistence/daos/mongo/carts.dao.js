
import ContenedorMongodb from '../../containers/ContenedorMongodb.js'
import Product from '../../models/Product.js'


export default class CartsMongoDAO extends ContenedorMongodb {
    constructor(model) {
        super(model)
    }

    getUserCart = async (id) => {
        try {
            const result = await this.model.findById(id)
            const list = await Promise.all(result.prods.map(product => {
                return this.createData(product)
            }))
            return list
        } catch (error) {
            throw new Error(error)
        }
    }

    createData = async(product) => {
        const producto = await Product.findById(product.idProduct)
        const newProduct = {
            producto: {
                name: producto.name,
                description: producto.description,
                price: producto.price,
            },
            cantidad: product.cant,
            subtotal: product.cant * producto.price
        }
        return newProduct
    }

    add = async (req) => {
        try {
            if(await this.existProduct(req.body.productId)){
                const product = await this.getOneByProductId(req.session.user.idCart, req.body.productId)
                if (product != null) {
                    const result = await this.addExistingProduct(req.session.user.idCart, product.idProduct, product.cant, true)
                    return result
                } else {
                    const newObject = {
                        idProduct: req.body.productId,
                        cant: 1
                    }
                    const result = await this.addNewProduct(req.session.user.idCart, newObject)
                    return result
                }
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    remove = async (req) => {
        try {
            const product = await this.getOneByProductId(req.session.user.idCart, req.params.id)
            console.log(product);
            if (product != null) {
                if(product.cant > 1){
                    const result = await this.addExistingProduct(req.session.user.idCart, product.idProduct, product.cant, false)
                    return result
                }else{
                    const result = await this.deleteProduct(req.session.user.idCart, req.params.id)
                    return result
                }
            } else {
                return 'Producto no encontrado'
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    getOneByProductId = async (id, product_id) => {
        try {
            const cart = await this.model.findOne({ '_id': id, 'prods.idProduct': product_id })
            if (cart != null) {
                return cart.prods.find(item => item.idProduct === product_id);
            } else {
                return null
            }

        } catch (error) {
            throw new Error(error)
        }
    }

    addNewProduct = async (id, product) => {
        try {
            const result = await this.model.findByIdAndUpdate(id,
                { $push: { prods: product } },
                { new: true }
            )
            return result
        } catch (error) {
            throw new Error(error)
        }
    }

    addExistingProduct = async (id, idProduct, cant, add) => {
        try {
            const result = await this.model.findOneAndUpdate(
                { '_id': id, 'prods.idProduct': idProduct },
                {
                    $set: {
                        'prods.$.cant': add ? cant += 1 : cant - 1
                    }
                },
                { new: true }
            )
            return result
        } catch (error) {
            throw new Error(error)
        }
    }

    deleteProduct = async (id, product_id) => {
        try {
            const result = await this.model.findByIdAndUpdate(id,
                {
                    $pull: { 'prods': { 'idProduct': product_id } }
                },
                { new: true }
            );
            return result
        } catch (error) {
            throw new Error(error)
        }
    }

    async existProduct(id) {
        try {
            return await Product.findById(id)
        } catch (error) {
            throw new Error('Ese producto no existe')
        }
    }
} 