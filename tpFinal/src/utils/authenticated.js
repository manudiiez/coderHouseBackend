import { ADMIN_EMAIL } from "../config/config.js"
import User from "../persistence/models/User.js"


export async function isAuthenticated(req, res, next) {
    if (req.session.user) {
        try {
            const user = await User.findOne({ email: req.session.user.email })
            if (!user) {
                res.json({ error: "Debe autenticarse para poder acceder a esta funciones(1)" })
            } else {
                return next()
            }
        }
        
        catch (error) {
            
            res.json({ error: error })
        }
    } else {
        res.json({ error: "Debe autenticarse para poder acceder a esta funciones" })
    }
}

export async function isAdmin(req, res, next) {
    if (req.session.user) {
        console.log(req.session.user.email, ADMIN_EMAIL);
        const user = await User.findOne({ email: req.session.user.email })
        if(!user){
            res.json({ error: "Debe autenticarse para poder acceder a esta funciones" })
        }else if (req.session.user.email !== ADMIN_EMAIL){
            res.json({ error: "Usted no tiene el acceso permitido a estas funciones" })
        }else{
            return next()
        }
    } else {
        res.json({ error: "Usted no tiene el acceso permitido a estas funciones" })
    }
}

