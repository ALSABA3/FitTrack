import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },

    date: { 
        type: Date,
        required: true
    },

    exercises: {
        type: [
          {
            name: { type: String, required: true },
            sets: { type: [Number], required: true }
          }
        ],
        required: true
      }


    


})

export default mongoose.model('Workout', workoutSchema);