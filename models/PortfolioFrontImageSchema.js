import mongoose from "mongoose";
const { Schema } = mongoose;

const PortfolioFrontImageSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
});

export const PortfolioFrontImage = mongoose.model(
  "PortfolioFrontImage",
  PortfolioFrontImageSchema
);
