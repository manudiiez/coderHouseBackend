class ContenedorMongodb {

    constructor(model) {
        this.model = model;
    }


    async getAll() {
        try {
            return await this.model.find({}).lean()
        } catch (error) {
            throw new Error(`${error}`)
        }

    } 
    async save(item) {
        const newModel = new this.model(item)
        try {
            return await newModel.save()
        } catch (error) {
            throw new Error(`${error}`)
        }
    }

    async getById(id) {
        try {
            return await this.model.findById(id)
            // const count =  await this.cliente(this.tabla).where({id: id}).select();
            // if (count) {
            //     return count
            // } else {
            //     throw new Error('Producto no encontrado')
            // }
        } catch (error) {
            throw new Error(error)
        }
    }
    
    async updateById(id, body) {
        try {
            return await this.model.findByIdAndUpdate(
                id,
                { $set: body },
                { new: true }
            )
            // const count =  await this.cliente(this.tabla).where({id: id}).update(objeto);
            // if (count) {
            //     return count
            // } else {
            //     throw new Error('Producto no encontrado')
            // }
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteById(id) {
        try {
            await this.model.findByIdAndDelete(id)
            // const count =  await this.cliente(this.tabla).where({id: id}).delete();
            // if (count) {
            //     return count
            // } else {
            //     throw new Error('Producto no encontrado')
            // }
        } catch (error) {
            throw new Error(error)
        }
    }
}

export default ContenedorMongodb
