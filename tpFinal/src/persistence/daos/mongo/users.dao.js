
import ContenedorMongodb from '../../containers/ContenedorMongodb.js'
import Cart from '../../models/Cart.js'
import usersRepository from '../../repositories/users.repository.js'


export default class UsersMongoDAO extends ContenedorMongodb {
    constructor(model) {
        super(model)
    }

    signup = async (data, cartId) => {
        const user = await this.model.findOne({ 'email': data.email })
        if (user) {
            throw new Error('Ya existe un usuario con ese email')
        } else {
            const cart = new Cart()
            const cartId = await cart.save()
            console.log(cartId);
            const newUser = new this.model();
            newUser.email = data.email;
            newUser.name = data.name;
            newUser.lastname = data.lastname;
            newUser.image = data.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgTgK1EYhwitE3CCCdbK1bNwFIu-vo2B5dnA&usqp=CAU";
            newUser.idCart = cartId._id

            newUser.password = newUser.encryptPassword(data.password);
            const usersRepoInstance = new usersRepository(newUser)
            await usersRepoInstance.sendEmail()
            
            const result = await newUser.save();
            return result
        }
    }

    signin = async (data) => {
        const user = await this.model.findOne({ 'email': data.email })
        if (!user) {
            throw new Error('No se encontro ningun usuario con ese email')
        } else if (!user.comparePassword(data.password)){
            throw new Error('Contraseña incorrecta')
        } else {
            return user
        }
    }
 
    getOneByProductId = async (id, product_id) => {
        try {
            return await this.model.findOne({ '_id': id, 'cart.product_id': product_id })
        } catch (error) {
            throw new Error(error)
        }
    }

    addNewProduct = async (id, product) => {
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

        addExistingProduct = async (id, id_product, product, add) => {
        try {
            const result = await this.model.findOneAndUpdate(
                { '_id': id, 'cart.product_id': id_product },
                {
                    $set: {
                        'cart.$.cantidad': add ? product.cantidad += 1 : product.cantidad - 1
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
                    $pull: { 'cart': { 'product_id': product_id } }
                },
                { new: true }
            );
            return result
        } catch (error) {
            throw new Error(error)
        }
    }

    deleteAllProduct = async (id) => {
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