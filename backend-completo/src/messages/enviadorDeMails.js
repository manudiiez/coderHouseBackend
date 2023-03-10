import { createTransport } from 'nodemailer';
import { EMAILER_CONFIG } from '../utils/config.js';

class EnviadorDeMails {
    constructor(config) {
        this.clienteNodemailer = createTransport(config)
    }

    async enviar(to, subject, html) {
        const mailOptions = {
            from: 'Servidor Node.js',
            to: to,
            subject: subject,
            html: html
        }
        try {
            return await this.clienteNodemailer.sendMail(mailOptions)
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

// const createMailOptions = (to, subject, html) => {
//     const mailOptions = {
//         from: 'Servidor Node.js',
//         to: to,
//         subject: subject,
//         html: html
//     }
//     return mailOptions
// }

export const enviadorDeMails = new EnviadorDeMails(EMAILER_CONFIG)
export const enviadorDeGmails = new EnviadorDeMails(EMAILER_CONFIG)
