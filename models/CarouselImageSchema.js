import mongoose from "mongoose";
const { Schema } = mongoose;

const CarouselImageSchema = new Schema({
  imageURL: {
    type: String,
    required: true,
    unique: true,
  },
  order: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  public_id: {
    type: String,
    required: true,
  },
});

CarouselImageSchema.pre("save", async function (next) {
  if (this.order !== undefined) return next();
  try {
    const lastImage = await mongoose
      .model("CarouselImage")
      .findOne({})
      .sort({ order: -1 })
      .select("order");

    const nextOrder = lastImage?.order != null ? lastImage.order + 1 : 1;

    this.order = nextOrder;
    next();
  } catch (error) {
    next(error);
  }
});

export const CarouselImage = mongoose.model(
  "CarouselImage",
  CarouselImageSchema
);
