import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: 'Sin descripcion'
    },
    image: {
        type: String,
        default: 'https://http2.mlstatic.com/D_NQ_NP_876031-MLA51698106514_092022-W.jpg'
    }
});

export default mongoose.model('Product', productSchema)