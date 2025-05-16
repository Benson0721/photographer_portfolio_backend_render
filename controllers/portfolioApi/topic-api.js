import { TopicImage } from "../../models/TopicImageSchema.js";
import {
  addImages,
  updateImage,
  deleteImages,
} from "../cloudinaryApi/img-api.js";

export const getTopicImages = async (req, res) => {
  try {
    const { category } = req.query;
    if (category) {
      const topicImages = await TopicImage.find({ category: category });
      if (!topicImages) {
        return res.status(404).json({ message: "No images found" });
      }
      res.json({ topicImages });
      return;
    } else {
      const topicImages = await TopicImage.find({});
      if (!topicImages) {
        return res.status(404).json({ message: "No images found" });
      }
      res.json({ topicImages });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addTopicImage = async (req, res) => {
  try {
    const { category, topic, notes } = req.query;

    const { folder1 } = req.params;
    const filepath = req.file.path;

    const imageData = await addImages(folder1, category, filepath);
    if (imageData.error) {
      return res.status(500).json({ message: imageData.error });
    }
    const newTopicImage = new TopicImage({
      category,
      topic,
      notes,
      imageURL: imageData.secure_url,
      public_id: imageData.public_id,
    });
    await newTopicImage.save();
    res.status(200).json({ message: "新增主題成功!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateTopicImage = async (req, res) => {
  try {
    const { newData } = req.body;
    const parsedData = JSON.parse(newData);
    const { category, topic, notes, id, publicID } = parsedData;
    const { folder1 } = req.params;
    const updateData = { category: category, topic: topic, notes: notes };
    if (req.file?.path) {
      const filepath = req.file.path;
      const filterPublicID = publicID.replace(
        `Pai/views/portfolio/${category}/`,
        ""
      );

      const imageData = await updateImage(
        folder1,
        category,
        filepath,
        filterPublicID
      );

      if (imageData.error) {
        return res.status(500).json({ message: imageData.error });
      }
      updateData.imageURL = imageData.secure_url;
    }

    await TopicImage.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json({ message: "更新資料成功!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTopicImage = async (req, res) => {
  try {
    const { publicId, id } = req.query;
    await deleteImages(publicId);
    await TopicImage.findByIdAndDelete(id);
    res.json({ message: "刪除成功!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
