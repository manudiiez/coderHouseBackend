
class ControladorAuth {

    constructor(contenedor) {
        this.contenedor = contenedor
    }

    
    signUp = async (req, res, next) => {
        try {
            const { email, password } = req.body
            const user = await this.contenedor.getOne({ 'email': email })
            if (user) {
                res.status(401).json({ error: 'Ese email ya esta en uso' })
            }else{
                const newUser = new this.contenedor();
                newUser.email = email;
                newUser.password = newUser.encryptPassword(password);
                const res = await newUser.save();
                res.status(201).json({ user: res })
            }

        } catch (error) {
            res.status(401).json({ error: `${error}` })
        }
    }

        
    getAll = async (req, res) => {
        try {
            res.status(200).json({ data: await this.contenedor.getAll() })
        } catch (error) {
            res.status(404).json({ error: `${error}` })
        }
    }

    getById = async (req, res) => {
        try {
            const id = req.params.id
            res.status(200).json({ data: await this.contenedor.getById(id) })
        } catch (error) {
            res.status(404).json({ error: `${error}` })
        }
    }

    updateById = async (req, res) => {
        try {
            const id = req.params.id
            const { password } = req.body
            const user = await this.contenedor.getById(id)
            const hashPassword = user.encryptPassword(password)
            res.status(200).json({ data: await this.contenedor.updateById(id, {...req.body, password: hashPassword}) })
        } catch (error) {
            res.status(404).json({ error: `${error}` })
        }
    }

    deleteById = async (req, res) => {
        try {
            const id = req.params.id
            res.status(301).json({ data: await this.contenedor.deleteById(id)})
            
        } catch (error) {
            res.status(404).json({ error: `${error}` })
        }
    }

}



export default ControladorAuth
