import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    order: {
        type: [Object]
    }
});

export default mongoose.model('Order', orderSchema)