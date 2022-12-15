// const fs = require('fs')
import fs from 'fs'

class ContenedorMysql {

    constructor(clienteMysql, tabla) {
        this.cliente = clienteMysql;
        this.tabla = tabla;
    }


    async getAll() {
        try {
            return await this.cliente(this.tabla).select();
        } catch (error) {
            throw new Error(`${error}`)
        }
    }
    async save(item) {
        try {
            await this.cliente(this.tabla).insert(item);
            return item
        } catch (error) {
            throw new Error(`${error}`)
        }
    }

    async getById(id) {
        try {
            const count =  await this.cliente(this.tabla).where({id: id}).select();
            if (count) {
                return count
            } else {
                throw new Error('Producto no encontrado')
            }
        } catch (error) {
            throw new Error(error)
        }
    }
    
    async updateById(objeto, id) {
        try {
            const count =  await this.cliente(this.tabla).where({id: id}).update(objeto);
            if (count) {
                return count
            } else {
                throw new Error('Producto no encontrado')
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteById(id) {
        try {
            const count =  await this.cliente(this.tabla).where({id: id}).delete();
            if (count) {
                return count
            } else {
                throw new Error('Producto no encontrado')
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}

export default ContenedorMysql
