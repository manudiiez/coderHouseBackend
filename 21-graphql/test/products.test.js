import { strictEqual, deepStrictEqual } from 'assert'
import axios from 'axios'
import chai from 'chai'


const expect = chai.expect


describe('Prueba de funciones del DAO Productos', () => {
    let products = null
    describe('Prueba método getAll()', () => {
        it('Tipo de respuesta: Array', async () => {
            products = await axios.get('http://localhost:8080/api/products')
            products = products.data.data
            expect(products).to.be.a('array')
        })
    })
    describe('Prueba método save()', async () => {
        const newItem = {
            name: "Remera de prueba",
            description: "La mejor remera de prueba del mercado",
            price: 1700
        }
        it('Tipo de respuesta: Objeto', async () => {
            const data = await axios.post('http://localhost:8080/api/products', newItem)
            expect(data.data.data).to.be.a('object')
        })
        it('Objeto agregado: Correcto', async () => {
            const res2 = await axios.get('http://localhost:8080/api/products')
            strictEqual(res2.data.data.length, products.length + 1)
        })
    })
    describe('Prueba método getById()', () => {
        it('Tipo de respuesta: Objeto', async () => {
            const data = await axios.get('http://localhost:8080/api/products/2')
            expect(data.data.data).to.be.a('object')
        })
        it('Objeto obtenido: Correcto', async () => {
            const data = await axios.get('http://localhost:8080/api/products/2')
            strictEqual(data.data.data._id, 2)
        })
    })

    describe('Prueba método updateById()', () => {
        it('Tipo de respuesta: Objeto', async () => {
            const newObject = { price: 2000 }
            const data = await axios.put(`http://localhost:8080/api/products/${products.length + 1}`, newObject)
            expect(data.data.data).to.be.a('object')
        })
        it('Objeto actualizado: Correcto', async () => {
            const data = await axios.get(`http://localhost:8080/api/products/${products.length + 1}`)
            strictEqual(data.data.data.price, 2000)
        })
    })

    describe('Prueba método deleteById()', () => {
        let previus = null
        it('Tipo de respuesta: Mensaje con id del objeto eliminado', async () => {
            previus = await axios.get(`http://localhost:8080/api/products/`)
            const data = await axios.delete(`http://localhost:8080/api/products/${products.length + 1}`)
            strictEqual(data.data.data, `Item ${products.length + 1} eliminado`)
        })
        it('Objeto eliminado: Correcto', async () => {
            const data = await axios.get(`http://localhost:8080/api/products`)

            strictEqual(data.data.data.length, previus.data.data.length -1 )
        })
    })
})

