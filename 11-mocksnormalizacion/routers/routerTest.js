import { Router } from "express"
import { faker } from '@faker-js/faker'


const routerTest = new Router()


routerTest.get('/', (req, res) => {
    const products = []
    for (let i = 0; i < 5; i++) {
        const newProduct = {
            nombre: faker.commerce.productName(),
            precio: faker.commerce.price(500, 3000),
            foto: faker.image.imageUrl()
        }
        products.push(newProduct)
    }
    res.status(201).json(products)
})

export default routerTest
