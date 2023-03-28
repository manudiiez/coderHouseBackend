export default class UsersDTO {
    constructor (email, password, name, lastname, image, role) {
        this.id = null
        this.email = email
        this.password = password
        this.name = name
        this.lastname = lastname
        this.image = image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgTgK1EYhwitE3CCCdbK1bNwFIu-vo2B5dnA&usqp=CAU";
        this.cart = cart
        this.role = role || 'client'
    }

    

}