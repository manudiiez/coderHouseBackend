class ControladorAuth {

    constructor() {
        this.admin = false
    }

    login = async (req, res) => {
        const { username } = req.query
        req.session.user = username
        res.render('index')
    }

    logOut = async (req, res) => {
        req.session.destroy(err => {
            if (err) {
                res.json({ status: 'Logout ERROR', body: err })
            }else{
                res.render('login')
            }
        })
        
    }


    isAuthenticated = (req, res, next) => {
        const username = req.session.user
        console.log(username);
        if (username) {
            next()
        } else {
            res.render('login')
        }
    }


}


const auth = new ControladorAuth()

export default auth
 