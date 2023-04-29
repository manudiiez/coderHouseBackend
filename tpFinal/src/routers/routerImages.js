import { Router } from "express"
import { isAuthenticated } from "../utils/authenticated.js"
import multer from 'multer'

const routerImages = new Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/persistence/database')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + file.originalname)
    }
})

const upload = multer({storage: storage})


routerImages.post('/', upload.single('image'), (req, res) => {
    res.status(200).json({url: `${req.file.destination}/${req.file.filename}`})
})

export default routerImages
