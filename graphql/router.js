import { Router } from 'express';

export const restRouter = Router();

restRouter.get('/personas', (req, res, next) => {
    res.json({msg: 'hola'})
})