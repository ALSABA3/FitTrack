const { Schema, model } = require("mongoose");

const ProfileSchema = new Schema({
    
    email: {
        type: String,
        required: true,
        unique: true
    },

    profileName: {
        type: String,
    },

    dateofbirth: {
        type: Date,
    },

    height: {
        type: String,
    },

    weight: {
        type: String,
    },

    gender: {
        type: String,
    }


})
module.exports = model("Profile", ProfileSchema);