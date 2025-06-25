import mongoose from "mongoose";
const { Schema } = mongoose;

const AlbumImageSchema = new Schema({
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
AlbumImageSchema.index({ category: 1, topic: 1 }); // 1 表示升序，-1 是降序

AlbumImageSchema.pre("find", function () {
  this.sort({ createdAt: -1 });
});

export const AlbumImage = mongoose.model("AlbumImage", AlbumImageSchema);
