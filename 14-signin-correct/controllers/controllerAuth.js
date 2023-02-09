import bcrypt from 'bcryptjs'


class ControladorAuth {

    constructor(contenedor) {
        this.contenedor = contenedor
    }

    register = async (req, res, next) => {
        try {
            const { email, password } = req.body
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)
            const newUser = {
                email: email,
                password: hash
            }
            const user = await this.contenedor.getByEmail(req.body.email)
            if (!user) {
                await this.contenedor.save(newUser)
                req.session.user = email
                res.status(201).json({ data: newUser })
            } else {
                res.status(404).json({ data: 'usuario ya registrado' })
            }
        } catch (error) {
            res.status(404).json({ error: `${error}` })
        }
    }
    login = async (req, res, next) => {
        res.status(201).json({ msg: `login` })
    }
    logout = async (req, res, next) => {
        res.status(201).json({ msg: `logout` })
    }

}



export default ControladorAuth
