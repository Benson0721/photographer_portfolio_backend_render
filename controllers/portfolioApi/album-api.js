import { AlbumImage } from "../../models/AlbumImageSchema.js";
import {
  addImages,
  updateImage,
  deleteImages,
} from "../cloudinaryApi/img-api.js";

export const getAlbumImages = async (req, res) => {
  try {
    const { category } = req.query;
    if (category) {
      const albumImages = await AlbumImage.find({});
      if (!albumImages) {
        return res.status(404).json({ message: "No images found" });
      }
      res.json({ albumImages });
      return;
    } else {
      const albumImages = await AlbumImage.find({});
      if (!albumImages) {
        return res.status(404).json({ message: "No images found" });
      }
      res.json({ albumImages });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addAlbumImage = async (req, res) => {
  try {
    const { category, topic, notes } = req.query;

    const filepath = req.file.path;

    const imageData = await addImages("portfolio", category, filepath);
    imageData.secure_url = imageData.secure_url.replace(
      "/upload/",
      "/upload/f_auto,q_auto,w_1440/"
    );

    if (imageData.error) {
      return res.status(500).json({ message: imageData.error });
    }
    const newAlbumImage = new AlbumImage({
      category,
      topic,
      notes,
      imageURL: imageData.secure_url,
      public_id: imageData.public_id,
    });
    await newAlbumImage.save();
    res.status(200).json({ message: "新增主題成功!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateAlbumImage = async (req, res) => {
  try {
    const { newData } = req.body;
    const parsedData = JSON.parse(newData);
    const { category, topic, notes, id, publicID } = parsedData;
    const updateData = { category: category, topic: topic, notes: notes };
    if (req.file?.path) {
      const filepath = req.file.path;
      const filterPublicID = publicID.replace(
        `${CLOUDINARYFOLDER}/views/portfolio/${category}/`,
        ""
      );

      const imageData = await updateImage(
        "portfolio",
        category,
        filepath,
        filterPublicID
      );

      if (imageData.error) {
        return res.status(500).json({ message: imageData.error });
      }
      updateData.imageURL = imageData.secure_url;
    }

    await AlbumImage.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json({ message: "更新資料成功!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAlbumImage = async (req, res) => {
  try {
    const { publicId, id } = req.query;
    await deleteImages(publicId);
    await AlbumImage.findByIdAndDelete(id);
    res.json({ message: "刪除成功!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
