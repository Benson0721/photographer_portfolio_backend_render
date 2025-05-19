import mongoose from "mongoose";
const { Schema } = mongoose;

const GalleryImageSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  imageURL: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// 複合索引（可以提高搜尋速度）
GalleryImageSchema.index({ category: 1 }); // 1 表示升序，-1 是降序

GalleryImageSchema.pre("find", function () {
  this.sort({ createdAt: -1 });
});

export const GalleryImage = mongoose.model("GalleryImage", GalleryImageSchema);
