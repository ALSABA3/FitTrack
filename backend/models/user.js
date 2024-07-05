import mongoose from "mongoose";

const userSchema = new mongoose.Schema({


    userEmail: {
        type: String,
        required: true
    }, 

    userPassword: {
        type: String,
        required: true
    },
    
    role: {
        type: String,
        default: "user"
    }


})

export default mongoose.model('User', userSchema);