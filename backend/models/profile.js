import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },

    firstName: {
      type: String,
      // required: true,
    },
    lastName: {
      type: String,
      // required: true,
    },

    dateofbirth: {
      type: Date,
      // required: true,
    },

    height: {
      type: String,
      // required: true,
    },

    weight: {
      type: String,
      // required: true,
    },

    gender: {
      type: String,
      // required: true,
    },
  },
  { _id: false }
);

export default mongoose.model("Profile", profileSchema);
