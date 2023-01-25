import bcrypt from 'bcryptjs'


class ControladorAuth {

    constructor(contenedor) {
        this.contenedor = contenedor
    }

    createSession = async (req, res) => {
        const { email } = req.body
        req.session.user = email
    }
    logOut = async (req, res) => {
        req.session.destroy(err => {
            if (err) {
                res.json({ status: 'Logout ERROR', body: err })
            } else {
                res.render('login')
            }
        })

    }
    isAuthenticated = (req, res, next) => {
        const username = req.session.user
        if (username) {
            next()
        } else {
            res.render('login')
        }
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
                res.render('index')
            }else{
                console.log('ya existe');
            }
        } catch (error) {
            res.status(404).json({ error: `${error}` })
        }
    }
    login = async (req, res, next) => {
        try {
            const user = await this.contenedor.getByEmail(req.body.email)
            const isPasswordCorrect = await bcrypt.compareSync(req.body.password, user.password);
            if (isPasswordCorrect) {
                req.session.user = user.email
                res.render('index')
            } else {
                res.render('errorRegister')
            }
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

}



export default ControladorAuth
