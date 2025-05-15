import { PortfolioFrontImage } from "../../models/PortfolioFrontImageSchema.js";

export const getFrontImages = async (req, res) => {
  try {
    const frontImages = await PortfolioFrontImage.find({});
    if (!frontImages) {
      return res.status(404).json({ message: "No images found" });
    }
    res.json({ frontImages });
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateFrontImage = async (req, res) => {
  try {
    const { category, imageURL } = req.body;
    const newImageURL = imageURL.replace(
      "/upload/f_auto,q_auto,w_1440",
      "/upload/f_auto,q_80"
    );
    await PortfolioFrontImage.findOneAndUpdate(
      { category: category },
      { $set: { imageURL: newImageURL } }
    );
    res.status(200).json({ message: "更新資料成功!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
