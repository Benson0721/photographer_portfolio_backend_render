import { DisplayImage } from "../../models/DisplayImageSchema.js";
import { addImages, deleteImages } from "../cloudinaryApi/img-api.js";


export const getDisplayImages = async (req, res) => {
  try {
    const { topicID } = req.query;
    const displayImages = await DisplayImage.find({ topicID });
    res.json({ displayImages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addDisplayImages = async (req, res) => {
  try {
    const { topicID } = req.body;
    const parsedTopicID = JSON.parse(topicID);
    const files = req.files;
    const paths = files.map((file) => file.path);
    const imageDatas = await addImages("portfolio", "display", paths);
    if (imageDatas.error) {
      return res.status(500).json({ message: imageDatas.error });
    }
    if (!Array.isArray(imageDatas)) {
      const image = new DisplayImage({
        imageURL: imageDatas.secure_url,
        public_id: imageDatas.public_id,
        topicID: parsedTopicID,
      });
      await image.save();
    } else {
      imageDatas.map(async (data) => {
        const image = new DisplayImage({
          imageURL: data.secure_url,
          public_id: data.public_id,
          topicID: parsedTopicID,
        });
        await image.save();
      });
    }
    res.status(200).json({ message: "新增圖片成功!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDisplayImage = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const { publicId, id } = req.query;
    await deleteImages(publicId);

    await DisplayImage.findOneAndDelete({
      _id: id,
    });
    res.status(200).json({ message: "刪除圖片成功!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
