import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    
    userID: {
        type: String,
        required: true
    },

    profileName: {
        type: String,
        required: true
    },

    dateofbirth: {
        type: Date,
        required: true
    },

    height: {
        type: String,
        required: true,
    },

    weight: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    }


})

export default mongoose.model('Profile', profileSchema);