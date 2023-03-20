export default class OrdersDTO {
    constructor (user_id, date) {
        this.user_id = user_id
        this.date = date
        this.order = []
        this.data = { user_id: user_id, date: date, order: order}
    }
}