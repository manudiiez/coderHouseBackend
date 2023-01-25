import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    products: {
        type: [String],
        default: []
    }
});

export default mongoose.model('Cart', cartSchema)