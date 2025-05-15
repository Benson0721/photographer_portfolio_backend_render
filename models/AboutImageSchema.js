import mongoose from "mongoose";
const { Schema } = mongoose;

const AboutImageSchema = new Schema({
  imageURL: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
  },
  public_id: {
    type: String,
  },
  offsetY: {
    type: Number,
    default: 0,
  },
});

export const AboutImage = mongoose.model("AboutImage", AboutImageSchema);
