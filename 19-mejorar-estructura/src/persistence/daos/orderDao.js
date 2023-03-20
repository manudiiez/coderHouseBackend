import ContenedorMongodb from '../containers/ContenedorMongodb.js'

class orderDao extends ContenedorMongodb {
    constructor(model) {
        super(model)
    }

    getByUser = async(id) => {
        try {
            const result = await this.model.find({ 'user_id': id})
            return result
        } catch (error) {
            throw new Error(error)
        }
    }

}

export default orderDao