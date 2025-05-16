import { SectionImage } from "../../models/SectionImageSchema.js";
import { updateImage } from "../cloudinaryApi/img-api.js";

export const getSectionImages = async (req, res) => {
  try {
    const sectionImages = await SectionImage.find({});
    res.status(200).json({ sectionImages });
  } catch (error) {
    res.status(500).json({ message: error.message || "取得圖片失敗" });
  }
};

export const updateSectionImage = async (req, res) => {
  try {
    const { folder1, folder2 = "" } = req.params;
    const { title, id, publicID = "" } = req.query;

    const filepath = req.file?.path;
    if (!filepath) {
      return res.status(400).json({ message: "缺少圖片檔案" });
    }

    const trimmedPublicID = publicID.replace("Pai/views/home/sections/", "");
    const imageData = await updateImage(
      folder1,
      folder2,
      filepath,
      trimmedPublicID
    );

    if (imageData.error) {
      return res.status(500).json({ message: imageData.error });
    }

    await SectionImage.findByIdAndUpdate(
      id,
      {
        imageURL: imageData.secure_url,
        public_id: imageData.public_id,
        title: title,
      },
      { new: true }
    );

    res.status(200).json({ message: "上傳圖片成功!" });
  } catch (error) {
    res.status(500).json({ message: error.message || "圖片更新失敗" });
  }
};

export const updateSectionName = async (req, res) => {
  try {
    const { title, id } = req.body;
    await SectionImage.findByIdAndUpdate(id, { title }, { new: true });
    res.status(200).json({ message: "更改標題成功!" });
  } catch (error) {
    res.status(500).json({ message: error.message || "名稱更新失敗" });
  }
};

export const adjustOffsetY = async (req, res) => {
  try {

    const { id, offsetY } = req.body;

    await SectionImage.findByIdAndUpdate(id, { offsetY }, { new: true });

    res.status(200).json({ message: "調整成功!" });
  } catch (error) {
    res.status(500).json({ message: error.message || "調整 Offset 失敗" });
  }
};
