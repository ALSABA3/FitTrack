import mongoose from "mongoose";

const pfpSchema = new mongoose.Schema({


    _id: {
        type: mongoose.Types.ObjectId,
        required: true
    }, 

    img: {
        data: Buffer,
        contentType: String
      }


}, { _id: false });

export default mongoose.model('Pfp', pfpSchema);