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
    type: Object,
    default: {
      mobile: 0,
      tablet: 0,
      desktop: 0,
    },
  },
});

export const SectionImage = mongoose.model("SectionImage", SectionImageSchema);
