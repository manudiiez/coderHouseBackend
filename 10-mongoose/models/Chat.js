import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    date: {
        type: String
    },
    text: {
        type: String,
        require: true
    },
});

export default mongoose.model('Chat', chatSchema)