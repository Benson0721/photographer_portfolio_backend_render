import mongoose from "mongoose";
const { Schema } = mongoose;

const TopicImageSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
    unique: true,
  },
  notes: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// 複合索引（可以提高搜尋速度）
TopicImageSchema.index({ category: 1, topic: 1 }); // 1 表示升序，-1 是降序

TopicImageSchema.pre("find", function () {
  this.sort({ createdAt: -1 });
});

export const TopicImage = mongoose.model("TopicImage", TopicImageSchema);
