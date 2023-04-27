import { Router } from "express"
import passport from "passport"
import flash from 'connect-flash'


const router = new Router()

const returnError = (req) => {
    return req.flash('errorMessage')[0]
}
const returnSuccess = (req) => {
    return req.user
}


router.post('/success', (req, res) => {
    res.status(200).json(returnSuccess(req))
})
router.post('/error', (req, res) => {
    res.status(200).json(returnError(req))
})

// router.post('/successMessage', (req, res) => {
//     console.log(req.flash('successMessage'));
//     res.status(200).json(returnSuccess(req))
// })


export default router
