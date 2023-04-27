import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    idCliente: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    prods: {
        type: [Object]
    },
    total: {
        type: Number,
        required: true
    }
});

export default mongoose.model('Order', orderSchema)