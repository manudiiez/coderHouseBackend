import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    alias: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    text: {
        type: String,
        require: true
    },
    date: {
        type: String
    },
});

export default mongoose.model('Chat', chatSchema)