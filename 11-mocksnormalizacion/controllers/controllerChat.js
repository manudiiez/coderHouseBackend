import { randomUUID } from 'crypto'


class ControladorChat {

    constructor(contenedor) {
        this.contenedor = contenedor
    }

    getAll = async (req, res, next) => {
        try {
            res.status(200).json({ data: await this.contenedor.getAll() })
        } catch (error) {
            res.status(404).json({ error: `${error}` })
        }
    }

    save = async (req, res) => {
        try {
            const id = randomUUID();
            const newMessage = {
                ...req.body,
                id: id
            }
            res.status(201).json({ data: await this.contenedor.save(req.body) })
        } catch (error) {
            res.status(404).json({ error: `${error}` })
        }
    }
    

}

export default ControladorChat
 