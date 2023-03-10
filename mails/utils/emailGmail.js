import { createTransport } from 'nodemailer';

const clienteNodemailer = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'manudiiez123@gmail.com',
        pass: 'nqukahxekksokmlx'
    }
});

const TEST_MAIL = 'damien.kling@ethereal.email'

const mailOptions = {
    from: 'Servidor Node.js',
    to: TEST_MAIL,
    subject: 'Mail de prueba desde Node.js',
    html: '<h1 style="color: blue;">Contenido de prueba con archivo adjunto desde <span style="color: green;">Node.js con Nodemailer</span></h1>',
}

try {
    const info = await clienteNodemailer.sendMail(mailOptions)
    console.log(info)
} catch (error) {
    console.log(error)
}
