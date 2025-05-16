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

DisplayImageSchema.pre("find", function () {
  this.sort({ createdAt: -1 });//-1代表由
});

export const DisplayImage = mongoose.model("DisplayImage", DisplayImageSchema);
