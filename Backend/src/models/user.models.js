import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    supabaseId: {
        type: String,
        unique: true,
        sparse: true
    },
    username: {
        type: String,
        unique: [true, "Username already exists"],
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        select: false
    },
    verified: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('User', userSchema)
export default User