import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs'


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    cart: {
        type: [Object]
    },
    role: {
        type: String,
        default: 'client'
    }
});

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('User', userSchema)