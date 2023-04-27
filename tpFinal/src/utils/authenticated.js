import { ADMIN_EMAIL } from "../config/config.js"

export function isAuthenticated (req, res, next){
    if(req.isAuthenticated()){
        return next()
    }else{
        res.json({error: "Debe autenticarse para poder acceder a esta funciones"})
    }
}

export function isAdmin (req, res, next){
    if(req.isAuthenticated() && req.user.email === ADMIN_EMAIL){
        return next()
    }else{
        res.json({error: "Usted no tiene el acceso permitido a estas funciones"})
    }
}