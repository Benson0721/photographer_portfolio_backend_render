import { CarouselImage } from "../../models/CarouselImageSchema.js";
import { addImages, deleteImages } from "../cloudinaryApi/img-api.js";

export const getCarouselImages = async (req, res) => {
  try {
    const carouselImages = await CarouselImage.find({});
    res.json({ carouselImages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const adjustCarouselOrder = async (req, res) => {
  try {
    const newOrderArray = req.body;

    const bulkOps = newOrderArray.map((item) => ({
      updateOne: {
        filter: { _id: item._id },
        update: { $set: { order: item.order } },
      },
    }));

    await CarouselImage.bulkWrite(bulkOps);
    res.status(200).json({ message: "更新順序成功" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addCarouselImage = async (req, res) => {
  try {
    const files = req.files;
    const paths = files.map((file) => file.path);
    const imageDatas = await addImages("home", "carousel", paths);
    if (imageDatas.error) {
      return res.status(500).json({ message: imageDatas.error });
    }
    imageDatas.map(async (data) => {
      const image = new CarouselImage({
        imageURL: data.secure_url,
        public_id: data.public_id,
      });
      await image.save();
    });
    res.status(200).json({ message: "新增圖片成功!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCarouselImage = async (req, res) => {
  try {
    const { publicId, id } = req.query;
    await deleteImages(publicId);
    await CarouselImage.findByIdAndDelete(id);
    res.status(200).json({ message: "刪除成功" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
