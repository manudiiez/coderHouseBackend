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

const createMailOptions = (to, subject, html) => {
    const mailOptions = {
        from: 'Servidor Node.js',
        to: to,
        subject: subject,
        html: html
    }
    return mailOptions
}

// export const enviadorDeMails = async() => {
//     const enviadorDeMails2 = new EnviadorDeMails(EMAILER_CONFIG)
//     const info = await enviadorDeMails2.enviar(createMailOptions('cuentaBLABLA@blabla.com', 'Mail de prueba desde Node.js', '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>'))
//     console.log(info)

// }
// export const enviadorDeMails = async() => {
//     const clienteNodemailer = createTransport(EMAILER_CONFIG);
    
//     const TEST_MAIL = 'cuentaBLABLA@blabla.com'
    
//     try {
//         const info = await clienteNodemailer.sendMail(createMailOptions(TEST_MAIL, 'Mail de prueba desde Node.js', '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>'))
//         console.log(info)
//     } catch (error) {
//         console.log(error)
//     }
// }

export const enviadorDeMails = new EnviadorDeMails(EMAILER_CONFIG)
