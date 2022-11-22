const { randomUUID } = require('crypto');


class ControladorChat {

    constructor(contenedor) {
        this.contenedor = contenedor
    }

    getAll = async (req, res, next) => {
        try {
            req.chat = await this.contenedor.getAll()
            next()
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
            await this.contenedor.save(newMessage)
            res.status(201).redirect('/')
        } catch (error) {
            res.status(404).json({ error: `${error}` })
        }
    }

}




exports.ControladorChat = ControladorChat;
