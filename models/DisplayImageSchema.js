import mongoose from "mongoose";
const { Schema } = mongoose;

const DisplayImageSchema = new Schema({
  topicID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TopicImage",
  },
  imageURL: {
    type: String,
    required: true,
    unique: true,
  },
  public_id: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const DisplayImage = mongoose.model("DisplayImage", DisplayImageSchema);
