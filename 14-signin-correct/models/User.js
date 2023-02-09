import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.methods.encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    return hash
};

userSchema.methods.comparePassword = function (password) {
    const isPasswordCorrect = bcrypt.compareSync(password, this.password);
    return isPasswordCorrect
};

export default mongoose.model('User', userSchema)