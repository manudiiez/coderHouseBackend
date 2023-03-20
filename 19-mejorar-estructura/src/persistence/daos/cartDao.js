import ContenedorMongodb from '../containers/ContenedorMongodb.js'

class cartDao extends ContenedorMongodb {
    constructor(model) {
        super(model)
    }

    addNewProduct = async(id, product) => {
        try {
            const result = await this.model.findByIdAndUpdate(id,
                { $push: { cart: product } },
                { new: true }
            )
            return result
        } catch (error) {
            throw new Error(error)
        }
    }

    addExistingProduct = async(id, id_product, product, add) => {
        try {
            const result = await this.model.findOneAndUpdate(
                { '_id': id, 'cart.product_id': id_product },
                {
                    $set: {
                        'cart.$.cantidad': add ? product.cantidad += 1 : product.cantidad-1
                    }
                },
                { new: true }
            )
            return result
        } catch (error) {
            throw new Error(error)
        }
    }
    
    deleteProduct = async(id, product_id) => {
        try {
            const result = await this.model.findByIdAndUpdate(id,
                {
                    $pull: { 'cart': { 'product_id': product_id } }
                },
                { new: true }
            );
            return result
        } catch (error) {
            throw new Error(error)
        }
    }

    deleteAllProduct = async(id) => {
        try {
            const result = await this.model.findByIdAndUpdate(id,
                {
                    $set: { 'cart': [] }
                },
                { new: true }
            );
            return result
        } catch (error) {
            throw new Error(error)
        }
    }
}

export default cartDao