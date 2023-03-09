import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    products: {
        type: [String],
        default: []
    },
});

export default mongoose.model('Cart', cartSchema)