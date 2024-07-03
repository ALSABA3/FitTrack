import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({

    userId: {
        Type: mongoose.Types.ObjectId,
        required: true
    },

    date: { 
        Type: date,
        required: true
    },

    exercises: {
        
    }

    


})

export default mongoose.model('Workout', workoutSchema);