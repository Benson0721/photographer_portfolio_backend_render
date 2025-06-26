import { AlbumImage } from "../../models/AlbumImageSchema.js";
import { PortfolioFrontImage } from "../../models/PortfolioFrontImageSchema.js";
import { DisplayImage } from "../../models/DisplayImageSchema.js";
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
    const { topic, notes } = req.query;

    const filepath = req.file.path;

    const imageData = await addImages("portfolio", "album", filepath);

    imageData.secure_url = imageData.secure_url.replace(
      "/upload/f_auto,q_70/",
      "/upload/f_auto,q_auto,w_1440/"
    );

    if (imageData.error) {
      return res.status(500).json({ message: imageData.error });
    }
    const newAlbumImage = new AlbumImage({
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
    const { topic, notes, id, publicID } = parsedData;
    const updateData = { topic: topic, notes: notes };
    if (req.file?.path) {
      const filepath = req.file.path;
      const filterPublicID = publicID?.replace(
        `${process.env.CLOUDINARYFOLDER}/views/portfolio/album/`,
        ""
      );

      const imageData = await updateImage(
        "portfolio",
        "album",
        filepath,
        filterPublicID
      );
      imageData.secure_url = imageData.secure_url.replace(
        "/upload/f_auto,q_70/",
        "/upload/f_auto,q_auto,w_1440/"
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
    const displayImage = await DisplayImage.find({ topicID: id }); //刪除的album中有displayImage
    if (displayImage) {
      const deleteImagesPublicIDs = [];
      displayImage.forEach((image) => {
        deleteImagesPublicIDs.push(image.public_id);
      });
      deleteImagesPublicIDs.push(publicId);
      await deleteImages(deleteImagesPublicIDs);
    } else {
      await deleteImages(publicId);
    }

    const deletedImage = await AlbumImage.findByIdAndDelete(id, {
      new: true,
    });
    await DisplayImage.deleteMany({ topicID: id });

    const frontImage = await PortfolioFrontImage.find({ category: "Album" }); //刪除的album剛好是封面圖片=>替換
    if (frontImage[0]?.public_id === deletedImage?.public_id) {
      const albumImages = await AlbumImage.find({});
      const newFrontImage = albumImages[0];
      await PortfolioFrontImage.findByIdAndUpdate(frontImage[0]._id, {
        imageURL: newFrontImage.imageURL,
        public_id: newFrontImage.public_id,
      });
    }

    res.json({ message: "刪除成功!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
