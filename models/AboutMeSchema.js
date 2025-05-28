import mongoose from "mongoose";
const { Schema } = mongoose;

const AboutMeSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const AboutMe = mongoose.model("AboutMe", AboutMeSchema);
