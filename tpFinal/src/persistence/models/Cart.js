import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    prods: {
        type: [Object]
    }
});

export default mongoose.model('Cart', cartSchema)