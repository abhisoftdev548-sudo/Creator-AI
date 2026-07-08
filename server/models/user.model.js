import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    plan: {
        type: String,
        default: 'free'
    },
    credits: {
        type: Number,
        default: 100
    },
    avatar: {
        type: String,
        
    }
})

const userModel = mongoose.model("user", userSchema);

export default userModel;