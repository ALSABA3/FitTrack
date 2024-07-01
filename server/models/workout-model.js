const { Schema, model } = require("mongoose");

const WorkoutSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  category: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  sets: {
    type: Number,
    required: true,
  },

  reps: {
    type: Number,
    required: true,
  },

  weight: {
    type: Number,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = model("Workout", WorkoutSchema);
