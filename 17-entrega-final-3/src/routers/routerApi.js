import { Router } from "express"
import passport from "passport"
 
const routerApi = new Router()

/* ----------------------------- AUTHENTICATION ----------------------------- */

routerApi.post('/users', passport.authenticate('local-signup', {
    successMessage: 'registro exitoso',
    failureMessage: 'error al registrar'
}))
    
routerApi.get('/userinfo', (req, res, next) => {
    // logger.info(req)
    console.log(req.user)
    res.status(201).json({ user: req.user })
})


/* -------------------------------- PRODUCTS -------------------------------- */
routerApi.get('/products', (req, res, next) => {
    // logger.info(req)
    res.status(201).json({ msg: 'obtiene todos los producto'  })
})

routerApi.post('/products', (req, res, next) => {
    // logger.info(req)
    res.status(201).json({ msg: 'ingresa producto'  })
})

routerApi.get('/products/:PRODUCT_ID', (req, res, next) => {
    // logger.info(req)
    res.status(201).json({ msg: 'obtiene un los producto'  })
})

routerApi.put('/products/:PRODUCT_ID', (req, res, next) => {
    // logger.info(req)
    res.status(201).json({ msg: 'edita un los producto'  })
})

routerApi.delete('/products/:PRODUCT_ID', (req, res, next) => {
    // logger.info(req)
    res.status(201).json({ msg: 'elimina un producto'  })
})

/* ------------------------------ SHOPPINGCART ------------------------------ */

routerApi.get('/shoppingcartproducts', (req, res, next) => {
    // logger.info(req)
    res.status(201).json({ msg: 'lista el carrito'  })
})

routerApi.post('/shoppingcartproducts', (req, res, next) => {
    // logger.info(req)
    res.status(201).json({ msg: 'agrega al carrito'  })
})

routerApi.delete('/shoppingcartproducts/:PRODUCT_ID', (req, res, next) => {
    // logger.info(req)
    res.status(201).json({ msg: 'elimina un producto del carrito'  })
})

routerApi.delete('/shoppingcartproducts', (req, res, next) => {
    // logger.info(req)
    res.status(201).json({ msg: 'elimina el carrito'  })
})

export default routerApi
