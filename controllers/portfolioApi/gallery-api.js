import { GalleryImage } from "../../models/GalleryImageSchema.js";
import {
  addImages,
  updateImage,
  deleteImages,
} from "../cloudinaryApi/img-api.js";

export const getGalleryImages = async (req, res) => {
  try {
    const { category } = req.query;

    if (category) {
      const galleryImages = await GalleryImage.find({ category: category });
      if (!galleryImages) {
        return res.status(404).json({ message: "No images found" });
      }
      res.json({ galleryImages });
      return;
    } else {
      const galleryImages = await GalleryImage.find({});
      if (!galleryImages) {
        return res.status(404).json({ message: "No images found" });
      }
      res.json({ galleryImages });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addGalleryImages = async (req, res) => {
  try {
    const { category } = req.query;

    const paths = req.files.map((file) => file.path);
    const imageDatas = await addImages("portfolio", category, paths);

    imageDatas.map((data) => {
      data.secure_url = data.secure_url.replace(
        "/upload/",
        "/upload/f_auto,q_auto,w_1440/"
      );
    });

    if (imageDatas.error) {
      return res.status(500).json({ message: imageDatas.error });
    }
    if (!Array.isArray(imageDatas)) {
      const newGalleryImage = new GalleryImage({
        category,
        imageURL: imageDatas.secure_url,
        public_id: imageDatas.public_id,
      });
      await newGalleryImage.save();
    } else {
      imageDatas.map(async (data) => {
        const newGalleryImage = new GalleryImage({
          category,
          imageURL: data.secure_url,
          public_id: data.public_id,
        });
        await newGalleryImage.save();
      });
    }
    res.status(200).json({ message: "新增圖片成功!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/*export const updateGalleryImage = async (req, res) => {
  try {
    const { newData } = req.body;
    const parsedData = JSON.parse(newData);
    const { category, notes, id, publicID } = parsedData;
    const updateData = { category: category, notes: notes };
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

    await GalleryImage.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json({ message: "更新資料成功!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
*/
export const deleteGalleryImage = async (req, res) => {
  try {
    const { publicId, id } = req.query;
    await deleteImages(publicId);
    await GalleryImage.findByIdAndDelete(id);
    res.json({ message: "刪除成功!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
