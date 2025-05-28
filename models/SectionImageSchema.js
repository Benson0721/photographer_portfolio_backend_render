import mongoose from "mongoose";
const { Schema } = mongoose;

const SectionImageSchema = new Schema({
  imageURL: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
  },
  public_id: {
    type: String,
  },
  offsetY: {
    mobile: { type: Number, default: 0 },
    tablet: { type: Number, default: 0 },
    desktop: { type: Number, default: 0 },
  },
});

export const SectionImage = mongoose.model("SectionImage", SectionImageSchema);
