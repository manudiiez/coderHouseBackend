import { Router } from 'express';
import { enviadorDeGmails, enviadorDeMails } from '../mensajeria/emails.js';

export const router = Router()

const cosas = []
const TEST_MAIL = 'manudiiez123@gmail.com'


const mailOptions = {
    from: 'Servidor Node.js',
    to: TEST_MAIL,
    subject: 'Mail de prueba desde Node.js',
    // text: 'texto plano. si hay html se toma solo el html',
    html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>'
}

router.post('/email', async(req, res, next) => {
    cosas.push(req.body)
    const result = await enviadorDeMails.enviar(mailOptions)
    res.json(result)
});

router.post('/gmail', async(req, res, next) => {
    cosas.push(req.body)
    const result = await enviadorDeGmails.enviar(mailOptions)
    res.json(result)
});
