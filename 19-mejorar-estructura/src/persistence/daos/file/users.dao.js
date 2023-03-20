import bcrypt from 'bcrypt-nodejs'
import fs from 'fs'


import ContenedorArchivo from '../../containers/ContenedorArchivo.js'
import usersRepository from '../../repositories/users.repository.js'

export default class UsersFileDAO extends ContenedorArchivo {
    constructor(path) {
        super(path)
    }

    signup = async (data) => {
        const users = await this.getAll()
        const user = await users.find(item => item.email === data.email)

        if (user) {
            throw new Error('Ya existe un usuario con ese email')
        } else {
            const newUser = {
                email: data.email,
                name: data.name,
                lastname: data.lastname,
                image: data.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgTgK1EYhwitE3CCCdbK1bNwFIu-vo2B5dnA&usqp=CAU",
                role: data.role || 'client',
                cart: [],
                password: await this.#encryptPassword(data.password),
            }

            const usersRepoInstance = new usersRepository(newUser)
            await usersRepoInstance.sendEmail()

            const result = await this.save(newUser)

            return result
        }
    }

    signin = async (data) => {

        const users = await this.getAll()
        const user = await users.find(item => item.email === data.email)

        if (!user) {
            throw new Error('No se encontro ningun usuario con ese email')
        } else if (await !this.#comparePassword(data.password, user.password)){
            throw new Error('Contraseña incorrecta')
        } else {
            console.log(user);
            return user
        }
    }

    getOneByProductId = async (id, product_id) => {
        try {

            const user = await this.getById(id)
            const product = user.cart.find(item => item.product_id === product_id)
            return product ? user : null
        } catch (error) {
            throw new Error(error)
        }
    }

    addNewProduct = async (id, product) => {
        try {
            const user = await this.getById(id)
            user.cart.push(product)


            const users = await this.getAll();
            const userIndex = users.findIndex(item => item._id === id)
            if (userIndex === -1) {
                throw new Error(`No se encontro ningun item con el id: ${objeto.id}`)
            }
            users[userIndex] = user;

            await fs.promises.writeFile(this.path, JSON.stringify(users, null, 2))
            return user
        } catch (error) {
            throw new Error(error)
        }
    }

    addExistingProduct = async (id, id_product, product, add) => {
        try {

            const users = await this.getAll();
            const userIndex = users.findIndex(item => item._id === id)

            const user = await this.getById(id)
            const productIndex = user.cart.findIndex(item => item.product_id === id_product)
            if (productIndex === -1){
                throw new Error('El producto no existe')
            }
            const producto = user.cart[productIndex]
            producto.cantidad = add ? product.cantidad += 1 : product.cantidad -= 1
            user.cart.splice(productIndex, 1, producto)
            users[userIndex] = user

            await fs.promises.writeFile(this.path, JSON.stringify(users, null, 2))
            
            return producto
        } catch (error) {
            throw new Error(error)
        }
    }

    deleteProduct = async (id, product_id) => {
        try {

            const users = await this.getAll();
            const userIndex = users.findIndex(item => item._id === id)

            const user = await this.getById(id)
            const productIndex = user.cart.findIndex(item => item.product_id === product_id)
            if (productIndex === -1){
                throw new Error('El producto no existe')
            }
            const producto = user.cart[productIndex]
            if(producto.cantidad > 1){
                producto.cantidad -= 1
            }else{
                user.cart.splice(productIndex, 1)
            }
            users[userIndex] = user

            await fs.promises.writeFile(this.path, JSON.stringify(users, null, 2))
            
            return user
        } catch (error) {
            throw new Error(error)
        }
    }

    deleteAllProduct = async (id) => {
        try {
            const users = await this.getAll();
            const userIndex = users.findIndex(item => item._id === id)

            const user = await this.getById(id)
            user.cart = []

            users[userIndex] = user
            await fs.promises.writeFile(this.path, JSON.stringify(users, null, 2))

            return user
        } catch (error) {
            throw new Error(error)
        }
    }

    #encryptPassword = async(password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    }

    #comparePassword = async function (password, passwordCompare) {
        return bcrypt.compareSync(password, passwordCompare);
    };
}