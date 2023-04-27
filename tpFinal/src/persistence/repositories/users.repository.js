import { enviadorDeMails } from '../../utils/enviadorDeMails.js'

const email_admin = 'manudiiez123@gmail.com'

export default class usersRepository {
    constructor(newUser) {
        this.newUser = newUser
    }

    async sendEmail() {

        await enviadorDeMails.enviar(email_admin, 'Ecommerce CoderHouse nuevo registro', `<h1 style="color: blue;">Felicidades un nuevo usuario se a unido a nuestra comunidad</h1> <br/> <h3>Email: ${this.newUser.email}</h3> <br/> <h3>Name: ${this.newUser.name}</h3> <br/> <h3>Last name: ${this.newUser.lastname}</h3> <br/> <h3>Role: ${this.newUser.role}</h3> `)
        
    }

}