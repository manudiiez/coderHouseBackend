import { createTransport } from 'nodemailer';

class EnviadorDeMails {
    constructor(config) {
        this.clienteNodemailer = createTransport(config)
    }

    async enviar(mailOptions) {
        try {
            return await this.clienteNodemailer.sendMail(mailOptions)
        } catch (error) {
            throw new Error(error.message)
        }
    }
}


const NODEMAILER_CONFIG = { 
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: "damien.kling@ethereal.email",
        pass: "ykwDnZqRhUupzbv6Ty"
    }
}
const NODEMAILER_CONFIG_GMAIL = { 
    service: 'gmail',
    port: 587,
    auth: {
        user: "manudiiez123@gmail.com",
        pass: "nqukahxekksokmlx"
    }
}

export const enviadorDeMails = new EnviadorDeMails(NODEMAILER_CONFIG)
export const enviadorDeGmails = new EnviadorDeMails(NODEMAILER_CONFIG_GMAIL)

