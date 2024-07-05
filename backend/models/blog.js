import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({


    title: {
        type: String, 
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["FITNESS",
  "NUTRITION",
  "RECIPES",
  "SUCCESS STORIES",
  "WELLNESS",],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }


},{timestamps: true})

export default mongoose.model('Blog', blogSchema);